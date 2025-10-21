import { Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderMenuComponent } from './header-menu/header-menu.component';


const COMPONENTS = [
  HeaderMenuComponent
]

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    COMPONENTS,
    ...MATERIAL_MODULES
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly isMobile = input<boolean>(false);
  private readonly _router = inject(Router);

  toggleMenu = output<void>();
  showLogo = signal<boolean>(true);

  menuItems = [
    { id: 1, text: 'Cerrar sesión', icon: 'logout', action: () => this.logout() },
  ]

  onToggleMenu() {
    this.toggleMenu.emit();
    this.showLogo.set(!this.showLogo());
  }

  logout() {
    this._router.navigate(['/auth/login']);
  }
}
