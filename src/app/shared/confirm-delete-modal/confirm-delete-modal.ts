import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-confirm-delete-modal',
  styleUrl: './confirm-delete-modal.css',
  templateUrl: './confirm-delete-modal.html',
})
export class ConfirmDeleteModal {
  @Input() name = '';
  @Output() answer = new EventEmitter<boolean>();

  yes() {
    this.answer.emit(true);
  }

  no() {
    this.answer.emit(false);
  }
}
