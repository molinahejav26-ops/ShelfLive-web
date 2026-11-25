import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../components/auth-layout-component/auth-layout-component';

/** Comprueba que "contraseña" y "confirmar contraseña" coinciden. */
const passwordsIguales: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmar = group.get('confirmarPassword')?.value;
  return password === confirmar ? null : { passwordsDistintas: true };
};

@Component({
  imports: [ReactiveFormsModule, RouterLink, AuthLayoutComponent],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private router = inject(Router);
  verPassword = signal(false);
  verConfirmacion = signal(false);

  registerForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/)
    ]),

    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
    ]),

    confirmarPassword: new FormControl('', [
      Validators.required
    ]),

    terminos: new FormControl(false, [
      Validators.requiredTrue
    ]),
  }, { validators: passwordsIguales });

  isInvalidField(field: string) {
    return this.registerForm.get(field)?.invalid && (this.registerForm.get(field)?.dirty || this.registerForm.get(field)?.touched);
  }

  /** Error de "no coinciden", solo cuando ya se ha escrito algo en la confirmación. */
  passwordsNoCoinciden() {
    const confirmar = this.registerForm.get('confirmarPassword');
    return this.registerForm.hasError('passwordsDistintas') && !!confirmar?.value && (confirmar.dirty || confirmar.touched);
  }

  togglePassword() {
    this.verPassword.update(valor => !valor);
  }

  toggleConfirmacion() {
    this.verConfirmacion.update(valor => !valor);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // TODO: llamar a AuthService.register(). De momento el backend solo tiene "name": enviar `${nombre} ${apellidos}`.
    // Mientras tanto (parte visual) vuelve al login.
    this.router.navigate(['/login']);
  }
}
