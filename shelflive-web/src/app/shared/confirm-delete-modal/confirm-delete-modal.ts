import { Component, inject, Input, output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [],
  selector: 'app-confirm-delete-modal',
  styleUrl: './confirm-delete-modal.css',
  templateUrl: './confirm-delete-modal.html',
})
export class ConfirmDeleteModal {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  @Input() name = '';

  // Devuelve true si pulsa "Sí, eliminar" y false si pulsa "No, cancelar"
  answer = output<boolean>();

  yes() {
    this.answer.emit(true);
    this.activeModal.close();
  }

  no() {
    this.answer.emit(false);
    this.activeModal.close();
  }
}
