import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';

import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../models';
import { TaskHttpService } from '../../services';
import { TaskForm } from '../../models/task-form.interface';

const ANGULAR_MODULES = [ReactiveFormsModule];

const MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

interface TaskFormModalData {
  task?: Task;
}


@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES
  ],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<TaskFormModalComponent>);
  private readonly taskService = inject(TaskHttpService);
  readonly data = inject<TaskFormModalData | null>(MAT_DIALOG_DATA);

  readonly isEditMode = computed(() => !!this.data?.task);
  readonly title = computed(() => this.isEditMode() ? 'Editar Tarea' : 'Nueva Tarea');
  readonly submitButtonText = computed(() => this.isEditMode() ? 'Actualizar' : 'Crear');

  readonly isLoading = signal(false);

  readonly form = new FormGroup<TaskForm>({
    userId: new FormControl('zOfy8sqlLUIggNZCJ3lJ', { nonNullable: true }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    })
  });

  ngOnInit(): void {
    if (this.isEditMode() && this.data?.task) {
      this.form.patchValue({
        title: this.data.task.title,
        description: this.data.task.description
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const formValue = this.form.getRawValue();

    if (this.isEditMode() && this.data?.task) {
      this.updateTask(this.data.task.id, formValue);
    } else {
      this.createTask(formValue);
    }
  }

  private createTask(taskData: CreateTaskDTO): void {
    this.taskService.create(taskData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => console.error('Error creating task:', error)
      });
  }

  private updateTask(id: string, taskData: UpdateTaskDTO): void {
    this.taskService.update(id, taskData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => console.error('Error updating task:', error)
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
