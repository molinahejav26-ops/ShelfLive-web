import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { Item } from '../../interfaces/item';
import { ItemModal } from '../../modals/item-modal/item-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent],
  selector: 'app-item-page',
  styleUrl: './item-page.css',
  templateUrl: './item-page.html',
})
export class ItemPage {
  private modalService = inject(NgbModal);

  // Datos de ejemplo (parte visual). Más adelante vendrán del ItemService.
  items = signal<Item[]>([
    { id: 1, product: 'The Legend of Zelda: Tears of the Kingdom', user: 'Nuria Gómez', state: 'Nuevo', price: 54.9 },
    { id: 2, product: 'Dune', user: 'Nuria Gómez', state: 'Usado', price: 12.5 },
    { id: 3, product: 'Watchmen', user: 'Álex Romero', state: 'Nuevo', price: 24.95 },
  ]);

  // Añadir (sin parámetro) o editar (con el ítem)
  openItemModal(item?: Item) {
    const modalRef = this.modalService.open(ItemModal);
    modalRef.componentInstance.item = item;

    modalRef.result.then(
      (value) => {
        if (item) {
          this.items.update(list => list.map(i => (i.id === item.id ? { ...i, ...value } : i)));
        } else {
          this.items.update(list => [...list, { id: Date.now(), ...value }]);
        }
      },
      () => { /* modal cancelado */ }
    );
  }

  openDeleteModal(item: Item) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.name = item.product;

    modalRef.componentInstance.answer.subscribe((accepted: boolean) => {
      if (accepted) {
        this.items.update(list => list.filter(i => i.id !== item.id));
      }
    });
  }
}
