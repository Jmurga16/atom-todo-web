import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskHttpService } from './task-http.service';
import { environment } from '../../../../environments/environment';
import { Task } from '../models';
import { ApiResponse } from '../../../core/models';

describe('TaskHttpService', () => {
  let service: TaskHttpService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/api/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskHttpService]
    });
    service = TestBed.inject(TaskHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should fetch all tasks for the current user', () => {
      const mockTasks: Task[] = [
        {
          id: '1',
          userId: 'user1',
          title: 'Task 1',
          description: 'Description 1',
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

      service.getAll().subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data).toEqual(mockTasks);
        expect(response.data?.length).toBe(1);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getById', () => {
    it('should fetch a task by id', () => {
      const taskId = '123';
      const mockTask: Task = {
        id: taskId,
        userId: 'user1',
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const mockResponse: ApiResponse<Task> = {
        success: true,
        data: mockTask
      };

      service.getById(taskId).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data).toEqual(mockTask);
        expect(response.data?.id).toBe(taskId);
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('should create a new task', () => {
      const newTask = {
        userId: 'user1',
        title: 'New Task',
        description: 'New Description',
        completed: false
      };
      const mockCreatedTask: Task = {
        id: '456',
        ...newTask,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const mockResponse: ApiResponse<Task> = {
        success: true,
        data: mockCreatedTask,
        message: 'Task created successfully'
      };

      service.create(newTask).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data?.title).toBe(newTask.title);
        expect(response.message).toBe('Task created successfully');
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTask);
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an existing task', () => {
      const taskId = '123';
      const updates = {
        title: 'Updated Title',
        description: 'Updated Description'
      };
      const mockUpdatedTask: Task = {
        id: taskId,
        userId: 'user1',
        title: updates.title,
        description: updates.description,
        completed: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const mockResponse: ApiResponse<Task> = {
        success: true,
        data: mockUpdatedTask,
        message: 'Task updated successfully'
      };

      service.update(taskId, updates).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data?.title).toBe(updates.title);
        expect(response.data?.description).toBe(updates.description);
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updates);
      req.flush(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a task', () => {
      const taskId = '123';
      const mockResponse: ApiResponse<void> = {
        success: true,
        message: 'Task deleted successfully'
      };

      service.delete(taskId).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.message).toBe('Task deleted successfully');
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('toggleCompleted', () => {
    it('should toggle task completion status', () => {
      const taskId = '123';
      const mockToggledTask: Task = {
        id: taskId,
        userId: 'user1',
        title: 'Task 1',
        description: 'Description 1',
        completed: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const mockResponse: ApiResponse<Task> = {
        success: true,
        data: mockToggledTask,
        message: 'Task status toggled successfully'
      };

      service.toggleCompleted(taskId).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data?.completed).toBe(true);
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });
  });
});
