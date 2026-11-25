import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar-component',
  styleUrl: './sidebar-component.css',
  templateUrl: './sidebar-component.html',
})
export class SidebarComponent {}
