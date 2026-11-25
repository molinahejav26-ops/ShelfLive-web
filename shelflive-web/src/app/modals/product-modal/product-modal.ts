import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../interfaces/product';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-modal',
  styleUrl: './product-modal.css',
  templateUrl: './product-modal.html',
})
export class ProductModal {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  editing = false;

  productForm = new FormGroup({
    barcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{8,14}$/)]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    platform: new FormControl(''),
    category: new FormControl('Videojuegos', [Validators.required]),
  });

  // Si llega un producto se está editando; si no, se está añadiendo
  @Input() set product(value: Product | undefined) {
    if (value) {
      this.editing = true;
      this.productForm.patchValue(value);
    }
  }

  isInvalidField(field: string) {
    return this.productForm.get(field)?.invalid && (this.productForm.get(field)?.dirty || this.productForm.get(field)?.touched);
  }

  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.activeModal.close(this.productForm.value);
  }
}
