import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  hidden: boolean = false;
  passwordType = 'password';
  eye = 'eye';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  onSubmit() {
    console.log('enviado');
  }

  async login() {
    try {
      this.loadingService.presentLoading();

      if (this.form.valid) {
        const { email, password } = this.form.getRawValue();
        const user = await this.authService.login(email, password);
        if (user) {
          console.log('User -->', user);
          this.router.navigate(['/home']);
          this.loadingService.dismissLoading();
          // const isVerified = this.authService.isEmailVerified(user);
          // this.redirectUser(isVerified)
        }
      } else {
        this.form.markAllAsTouched();
      }
    } catch (error) {
      console.error('Error -->', error);
      this.loadingService.dismissLoading();
    }
  }

  togglePasswordMode() {
    this.hidden = !this.hidden;
    this.passwordType = this.hidden ? 'text' : 'password';
    this.eye = this.hidden ? 'eye-off' : 'eye';
  }
}
