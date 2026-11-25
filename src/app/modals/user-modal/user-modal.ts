import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-modal',
  styleUrl: './user-modal.css',
  templateUrl: './user-modal.html',
})
export class UserModal {
  @Output() saved = new EventEmitter<Omit<User, 'id'>>();
  @Output() dismissed = new EventEmitter<void>();

  editing = false;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('user', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  @Input() set user(value: User | undefined) {
    if (value) {
      this.editing = true;
      this.userForm.patchValue(value);
      // al editar no se cambia la contraseña
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  isInvalidField(field: string) {
    return this.userForm.get(field)?.invalid && (this.userForm.get(field)?.dirty || this.userForm.get(field)?.touched);
  }

  save() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const value = this.userForm.getRawValue();
    this.saved.emit({
      name: value.name ?? '',
      email: value.email ?? '',
      role: value.role ?? 'user',
    });
  }
}
