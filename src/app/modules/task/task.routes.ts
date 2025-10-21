import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    loadComponent: () =>
      import('./pages/task-list/task-list.component').then(m => m.TaskListComponent),
    title: 'Lista de Tareas'
  }
];
