import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/tasks`;

  getAll(userId?: string): Observable<Task[]> {    
    return this.http.get<Task[]>(`${this.apiUrl}/user/${userId || 'zOfy8sqlLUIggNZCJ3lJ'}`);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  update(id: string, task: UpdateTaskDto): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleCompleted(id: string, completed: boolean): Observable<Task> {
    return this.update(id, { completed });
  }
}
