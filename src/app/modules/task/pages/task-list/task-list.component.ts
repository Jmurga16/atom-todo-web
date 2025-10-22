import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { Task } from '../../models';
import { TaskHttpService } from '../../services';
import { ApiResponse } from '../../../../core/models';
import { NotificationService } from '../../../../core/services';
import { TaskFormModalComponent } from '../../components/task-form-modal/task-form-modal.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

const MATERIAL_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatChipsModule
];

const PIPES = [DatePipe];

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ...MATERIAL_MODULES,
    ...PIPES
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  private readonly taskService = inject(TaskHttpService);
  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);

  readonly tasks = signal<Task[]>([]);
  readonly isLoading = signal(false);
  readonly displayedColumns = ['checkbox', 'title', 'description', 'status', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.taskService.getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.tasks.set(response.data || []);
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
          this.notificationService.showError('Error al cargar las tareas');
        }
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '600px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  toggleCompleted(task: Task): void {
    this.taskService.toggleCompleted(task.id)
      .subscribe({
        next: (response) => {
          this.loadTasks();
          const status = response.data?.completed ? 'completada' : 'marcada como pendiente';
          this.notificationService.showSuccess(`Tarea ${status} exitosamente`);
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.notificationService.showError('Error al actualizar la tarea');
        }
      });
  }

  confirmDelete(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Tarea',
        message: `¿Estás seguro de eliminar la tarea "${task.title}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteTask(task.id);
      }
    });
  }

  private deleteTask(id: string): void {
    this.taskService.delete(id)
      .subscribe({
        next: (response) => {
          this.loadTasks();
          this.notificationService.showSuccess('Tarea eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.notificationService.showError('Error al eliminar la tarea');
        }
      });
  }
}
