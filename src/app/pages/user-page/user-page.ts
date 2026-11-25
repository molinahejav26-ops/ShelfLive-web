import { Component, computed, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { User } from '../../interfaces/user';
import { UserModal } from '../../modals/user-modal/user-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SidebarComponent, UserModal, ConfirmDeleteModal],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {
  // Datos de ejemplo (parte visual). Más adelante vendrán del UserService.
  users = signal<User[]>([
    { id: 1, name: 'Nuria Gómez', email: 'nuria.gomez@gmail.com', role: 'user' },
    { id: 2, name: 'Álex Romero', email: 'alex.romero@icloud.com', role: 'user' },
    { id: 3, name: 'Lucía Martín', email: 'lucia@shelflife.app', role: 'admin' },
  ]);
  search = signal('');
  userFormOpen = signal(false);
  editingUser = signal<User | undefined>(undefined);
  userToDelete = signal<User | undefined>(undefined);
  filteredUsers = computed(() => {
    const term = this.search().trim().toLocaleLowerCase();
    return this.users().filter(user => `${user.name} ${user.email} ${user.role}`.toLocaleLowerCase().includes(term));
  });

  onSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.search.set(event.target.value);
  }

  // Añadir (sin parámetro) o editar (con el usuario)
  openUserModal(user?: User) {
    this.editingUser.set(user);
    this.userFormOpen.set(true);
  }

  saveUser(value: Omit<User, 'id'>): void {
    const current = this.editingUser();
    if (current) this.users.update(list => list.map(user => user.id === current.id ? { ...user, ...value } : user));
    else this.users.update(list => [...list, { id: Date.now(), ...value }]);
    this.closeUserModal();
  }

  closeUserModal(): void {
    this.userFormOpen.set(false);
    this.editingUser.set(undefined);
  }

  openDeleteModal(user: User) {
    this.userToDelete.set(user);
  }

  resolveDelete(accepted: boolean): void {
    const user = this.userToDelete();
    if (accepted && user) this.users.update(list => list.filter(item => item.id !== user.id));
    this.userToDelete.set(undefined);
  }
}
