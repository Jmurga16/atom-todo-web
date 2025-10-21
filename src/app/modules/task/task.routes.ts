import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    loadComponent: () =>
      import('./pages/task-list/task-list.component').then(m => m.TaskListComponent),
    title: 'Lista de Tareas'
  },
  /* {
    path: 'create',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
    title: 'Crear Tarea'
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
    title: 'Editar Tarea'
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/task-detail/task-detail.component').then(m => m.TaskDetailComponent),
    title: 'Detalle de Tarea'
  } */
];
