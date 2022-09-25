import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit() {
    console.log('enviado');
  }

  register() {
    if (this.form.valid) {
      const { email, password, confirmPassword } = this.form.getRawValue();
      console.log(email, password, confirmPassword);
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
