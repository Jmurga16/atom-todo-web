import { Component } from '@angular/core';
import { ISideMenuItem } from '../../models/side-menu-item.interface';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MatNavList } from '@angular/material/list';

const COMPONENTS = [
  SidenavItemComponent
]

const MATERIAL_MODULES = [
  MatNavList
];

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    COMPONENTS,
    ...MATERIAL_MODULES
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  menuItems: ISideMenuItem[] = [
    {
      id: 1,
      title: 'Inicio',
      icon: 'home',
      url: 'home'
    },
    {
      id: 2,
      title: 'Tasks',
      icon: 'task',
      url: '/main/task'
    }
  ]
}
