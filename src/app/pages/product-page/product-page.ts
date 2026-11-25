import { Component, computed, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { Product } from '../../interfaces/product';
import { ProductModal } from '../../modals/product-modal/product-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent, ProductModal, ConfirmDeleteModal],
  selector: 'app-product-page',
  styleUrl: './product-page.css',
  templateUrl: './product-page.html',
})
export class ProductPage {
  // Datos de ejemplo (parte visual). Más adelante vendrán del ProductService.
  products = signal<Product[]>([
    { id: 1, barcode: '0045496478704', title: 'The Legend of Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', category: 'Videojuegos' },
    { id: 2, barcode: '9788497596824', title: 'Dune', platform: '', category: 'Libros' },
    { id: 3, barcode: '9788418040275', title: 'Watchmen', platform: '', category: 'Cómics' },
  ]);
  search = signal('');
  productFormOpen = signal(false);
  editingProduct = signal<Product | undefined>(undefined);
  productToDelete = signal<Product | undefined>(undefined);
  filteredProducts = computed(() => {
    const term = this.search().trim().toLocaleLowerCase();
    return this.products().filter(product =>
      `${product.title} ${product.barcode} ${product.platform} ${product.category}`.toLocaleLowerCase().includes(term)
    );
  });

  onSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.search.set(event.target.value);
  }

  // Añadir (sin parámetro) o editar (con el producto)
  openProductModal(product?: Product) {
    this.editingProduct.set(product);
    this.productFormOpen.set(true);
  }

  saveProduct(value: Pick<Product, 'barcode' | 'title' | 'platform' | 'category'>): void {
    const current = this.editingProduct();
    if (current) this.products.update(list => list.map(product => product.id === current.id ? { ...product, ...value } : product));
    else this.products.update(list => [...list, { id: Date.now(), ...value }]);
    this.closeProductModal();
  }

  closeProductModal(): void {
    this.productFormOpen.set(false);
    this.editingProduct.set(undefined);
  }

  openDeleteModal(product: Product) {
    this.productToDelete.set(product);
  }

  resolveDelete(accepted: boolean): void {
    const product = this.productToDelete();
    if (accepted && product) this.products.update(list => list.filter(item => item.id !== product.id));
    this.productToDelete.set(undefined);
  }
}
