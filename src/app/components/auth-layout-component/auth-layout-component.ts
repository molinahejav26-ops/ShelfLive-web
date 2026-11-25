import { Component, ViewEncapsulation, input } from '@angular/core';

/**
 * Estructura común de las pantallas de acceso (login y registro):
 * panel izquierdo con la marca y el mensaje, y panel derecho con el formulario
 * (que se proyecta con <ng-content>).
 * Usa ViewEncapsulation.None para que sus estilos (campos, botones, avisos...)
 * también se apliquen al formulario proyectado desde cada página.
 */
@Component({
  imports: [],
  selector: 'app-auth-layout-component',
  styleUrl: './auth-layout-component.css',
  templateUrl: './auth-layout-component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent {
  etiqueta = input('');
  titulo = input('');
  texto = input('');
}
