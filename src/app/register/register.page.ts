import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { LoadingService } from '../core/services/loading.service';
import { MyValidators } from '../utils/my-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  hidden: boolean = false;
  passwordType = 'password';
  eye = 'eye';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.form = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          MyValidators.matchValues('password'),
        ],
      ],
    });
  }

  togglePasswordMode() {
    this.hidden = !this.hidden;
    this.passwordType = this.hidden ? 'text' : 'password';
    this.eye = this.hidden ? 'eye-off' : 'eye';
  }

  async register() {
    try {
      this.loadingService.presentLoading();
      if (this.form.valid) {
        const { email, password } = this.form.getRawValue();
        const user = await this.authService.register(email, password);
        if (user) {
          this.router.navigate(['/home']);
          this.loadingService.dismissLoading();
        }
      } else {
        this.form.markAllAsTouched();
      }
    } catch (error) {
      this.loadingService.dismissLoading();
      console.error('Error -->', error);
    }
  }

  // private redirectUser(isVerified: boolean) {
  //   // redirect --> admin
  //   // else VerificationPage
  //   if (isVerified) {
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.router.navigate(['/verify-email']);
  //   }
  // }
}
