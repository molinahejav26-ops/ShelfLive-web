import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../interfaces/item';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-item-modal',
  styleUrl: './item-modal.css',
  templateUrl: './item-modal.html',
})
export class ItemModal {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  editing = false;

  itemForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    state: new FormControl('Nuevo', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  @Input() set item(value: Item | undefined) {
    if (value) {
      this.editing = true;
      this.itemForm.patchValue(value);
    }
  }

  isInvalidField(field: string) {
    return this.itemForm.get(field)?.invalid && (this.itemForm.get(field)?.dirty || this.itemForm.get(field)?.touched);
  }

  save() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    this.activeModal.close(this.itemForm.value);
  }
}
