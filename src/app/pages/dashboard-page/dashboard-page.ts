import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';

@Component({
  imports: [SidebarComponent, RouterLink],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  readonly totalUsers = '24.842';
  readonly totalItems = '1.284.630';
  readonly activityToday = '8.392';
  readonly recentActivity = [
    { initials: 'LM', name: 'Lucía Martín', action: 'añadió un producto', detail: 'Dune · Libros', time: 'hace 4 min', tone: 'mint' },
    { initials: 'AR', name: 'Álex Romero', action: 'actualizó su colección', detail: '3 ítems modificados', time: 'hace 18 min', tone: 'blue' },
    { initials: 'NG', name: 'Nuria Gómez', action: 'registró un ítem', detail: 'The Legend of Zelda', time: 'hace 32 min', tone: 'coral' },
    { initials: 'SC', name: 'Sergio Cruz', action: 'se unió a ShelfLife', detail: 'Nuevo usuario', time: 'hace 1 h', tone: 'yellow' },
  ];
  readonly weeklyActivity = [
    { day: 'Lun', height: 46 }, { day: 'Mar', height: 68 }, { day: 'Mié', height: 55 },
    { day: 'Jue', height: 82 }, { day: 'Vie', height: 62 }, { day: 'Sáb', height: 94 }, { day: 'Dom', height: 73 },
  ];
}
