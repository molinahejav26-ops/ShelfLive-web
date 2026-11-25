import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../../components/auth-layout-component/auth-layout-component';

@Component({
  imports: [ReactiveFormsModule, AuthLayoutComponent],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private router = inject(Router);
  verPassword = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),

    recordarDispositivo: new FormControl(false),
  });

  isInvalidField(field: string) {
    return this.loginForm.get(field)?.invalid && (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched);
  }

  togglePassword() {
    this.verPassword.update(valor => !valor);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // TODO: llamar a AuthService.login() con email y password. De momento solo navega (parte visual).
    this.router.navigate(['/dashboard']);
  }
}
