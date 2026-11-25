import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-modal',
  styleUrl: './user-modal.css',
  templateUrl: './user-modal.html',
})
export class UserModal {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  editing = false;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('Usuario', [Validators.required]),
  });

  @Input() set user(value: User | undefined) {
    if (value) {
      this.editing = true;
      this.userForm.patchValue(value);
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
    this.activeModal.close(this.userForm.value);
  }
}
