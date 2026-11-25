import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { Product } from '../../interfaces/product';
import { ProductModal } from '../../modals/product-modal/product-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent],
  selector: 'app-product-page',
  styleUrl: './product-page.css',
  templateUrl: './product-page.html',
})
export class ProductPage {
  private modalService = inject(NgbModal);

  // Datos de ejemplo (parte visual). Más adelante vendrán del ProductService.
  products = signal<Product[]>([
    { id: 1, barcode: '0045496478704', title: 'The Legend of Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', category: 'Videojuegos' },
    { id: 2, barcode: '9788497596824', title: 'Dune', platform: '', category: 'Libros' },
    { id: 3, barcode: '9788418040275', title: 'Watchmen', platform: '', category: 'Cómics' },
  ]);

  // Añadir (sin parámetro) o editar (con el producto)
  openProductModal(product?: Product) {
    const modalRef = this.modalService.open(ProductModal);
    modalRef.componentInstance.product = product;

    modalRef.result.then(
      (value) => {
        if (product) {
          this.products.update(list => list.map(p => (p.id === product.id ? { ...p, ...value } : p)));
        } else {
          this.products.update(list => [...list, { id: Date.now(), ...value }]);
        }
      },
      () => { /* modal cancelado */ }
    );
  }

  openDeleteModal(product: Product) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.name = product.title;

    modalRef.componentInstance.answer.subscribe((accepted: boolean) => {
      if (accepted) {
        this.products.update(list => list.filter(p => p.id !== product.id));
      }
    });
  }
}
