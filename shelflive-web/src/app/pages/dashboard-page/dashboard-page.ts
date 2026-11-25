import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';

@Component({
  imports: [SidebarComponent],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  // Datos de ejemplo (parte visual)
  totalUsers = 24842;
  totalItems = 1284630;
  activityToday = 8392;
}
