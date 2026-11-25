import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../interfaces/item';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-item-modal',
  styleUrl: './item-modal.css',
  templateUrl: './item-modal.html',
})
export class ItemModal {
  @Output() saved = new EventEmitter<Omit<Item, 'id'>>();
  @Output() dismissed = new EventEmitter<void>();

  editing = false;

  itemForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    state: new FormControl('new', [Validators.required]),
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
    const value = this.itemForm.getRawValue();
    this.saved.emit({
      product: value.product ?? '',
      user: value.user ?? '',
      state: value.state ?? 'new',
      price: value.price ?? 0,
    });
  }
}
