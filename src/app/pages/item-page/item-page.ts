import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { Item } from '../../interfaces/item';
import { ItemModal } from '../../modals/item-modal/item-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent, CurrencyPipe, ItemModal, ConfirmDeleteModal],
  selector: 'app-item-page',
  styleUrl: './item-page.css',
  templateUrl: './item-page.html',
})
export class ItemPage {
  // Datos de ejemplo (parte visual). Más adelante vendrán del ItemService.
  items = signal<Item[]>([
    { id: 1, product: 'The Legend of Zelda: Tears of the Kingdom', user: 'Nuria Gómez', state: 'new', price: 54.9 },
    { id: 2, product: 'Dune', user: 'Nuria Gómez', state: 'used', price: 12.5 },
    { id: 3, product: 'Watchmen', user: 'Álex Romero', state: 'new', price: 24.95 },
  ]);
  search = signal('');
  itemFormOpen = signal(false);
  editingItem = signal<Item | undefined>(undefined);
  itemToDelete = signal<Item | undefined>(undefined);
  filteredItems = computed(() => {
    const term = this.search().trim().toLocaleLowerCase();
    return this.items().filter(item => `${item.product} ${item.user} ${item.state} ${item.price}`.toLocaleLowerCase().includes(term));
  });

  onSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.search.set(event.target.value);
  }

  // Añadir (sin parámetro) o editar (con el ítem)
  openItemModal(item?: Item) {
    this.editingItem.set(item);
    this.itemFormOpen.set(true);
  }

  saveItem(value: Omit<Item, 'id'>): void {
    const current = this.editingItem();
    if (current) this.items.update(list => list.map(item => item.id === current.id ? { ...item, ...value } : item));
    else this.items.update(list => [...list, { id: Date.now(), ...value }]);
    this.closeItemModal();
  }

  closeItemModal(): void {
    this.itemFormOpen.set(false);
    this.editingItem.set(undefined);
  }

  openDeleteModal(item: Item) {
    this.itemToDelete.set(item);
  }

  resolveDelete(accepted: boolean): void {
    const item = this.itemToDelete();
    if (accepted && item) this.items.update(list => list.filter(entry => entry.id !== item.id));
    this.itemToDelete.set(undefined);
  }
}
