import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models';
import { ApiResponse } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/tasks`;

  getAll(): Observable<ApiResponse<Task[]>> {    
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl);
  }

  getAllWithQuery(params?: {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'title';
    sortOrder?: 'asc' | 'desc';
    completed?: boolean;
    title?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<ApiResponse<{ tasks: Task[]; total: number; page: number; limit: number; totalPages: number }>> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    
    return this.http.get<ApiResponse<{ tasks: Task[]; total: number; page: number; limit: number; totalPages: number }>>(`${this.apiUrl}/query`, { params: httpParams });
  }

  getById(id: string): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`);
  }

  create(task: CreateTaskDTO): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(this.apiUrl, task);
  }

  update(id: string, task: UpdateTaskDTO): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  toggleCompleted(id: string): Observable<ApiResponse<Task>> {
    return this.http.patch<ApiResponse<Task>>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
