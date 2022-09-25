import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      console.log(email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePasswordMode() {
    this.hidden = !this.hidden;
    this.passwordType = this.hidden ? 'text' : 'password';
    this.eye = this.hidden ? 'eye-off' : 'eye';
  }
}
