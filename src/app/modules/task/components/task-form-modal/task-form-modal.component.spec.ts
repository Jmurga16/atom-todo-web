import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TaskFormModalComponent } from './task-form-modal.component';

describe('TaskFormModalComponent', () => {
  let component: TaskFormModalComponent;
  let fixture: ComponentFixture<TaskFormModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TaskFormModalComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormModalComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form in create mode', () => {
    expect(component.isEditMode()).toBe(false);
    expect(component.title()).toBe('Nueva Tarea');
    expect(component.form.get('title')?.value).toBe('');
  });

  it('should have form validation', () => {
    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      title: 'Test Task',
      description: 'Test Description'
    });

    expect(component.form.valid).toBe(true);
  });
});
