import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { TaskListComponent } from './task-list.component';
import { TaskHttpService } from '../../services';
import { ApiResponse } from '../../../../core/models';
import { Task } from '../../models';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskHttpService: jasmine.SpyObj<TaskHttpService>;

  beforeEach(async () => {
    mockTaskHttpService = jasmine.createSpyObj('TaskHttpService', ['getAll', 'toggleCompleted', 'delete']);

    const mockTasks: Task[] = [
      {
        id: '1',
        userId: 'user1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const mockResponse: ApiResponse<Task[]> = {
      success: true,
      data: mockTasks
    };

    mockTaskHttpService.getAll.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskHttpService, useValue: mockTaskHttpService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(mockTaskHttpService.getAll).toHaveBeenCalled();
    expect(component.tasks().length).toBe(1);
  });
});
