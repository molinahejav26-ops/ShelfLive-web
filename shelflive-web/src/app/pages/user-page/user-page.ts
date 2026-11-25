import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { User } from '../../interfaces/user';
import { UserModal } from '../../modals/user-modal/user-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {
  private modalService = inject(NgbModal);

  // Datos de ejemplo (parte visual). Más adelante vendrán del UserService.
  users = signal<User[]>([
    { id: 1, name: 'Nuria Gómez', email: 'nuria.gomez@gmail.com', role: 'Usuario' },
    { id: 2, name: 'Álex Romero', email: 'alex.romero@icloud.com', role: 'Usuario' },
    { id: 3, name: 'Lucía Martín', email: 'lucia@shelflife.app', role: 'Administrador' },
  ]);

  // Añadir (sin parámetro) o editar (con el usuario)
  openUserModal(user?: User) {
    const modalRef = this.modalService.open(UserModal);
    modalRef.componentInstance.user = user;

    modalRef.result.then(
      (value) => {
        if (user) {
          this.users.update(list => list.map(u => (u.id === user.id ? { ...u, ...value } : u)));
        } else {
          this.users.update(list => [...list, { id: Date.now(), ...value }]);
        }
      },
      () => { /* modal cancelado */ }
    );
  }

  openDeleteModal(user: User) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.name = user.name;

    modalRef.componentInstance.answer.subscribe((accepted: boolean) => {
      if (accepted) {
        this.users.update(list => list.filter(u => u.id !== user.id));
      }
    });
  }
}
