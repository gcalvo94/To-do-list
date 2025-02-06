import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskRequest } from '../models/Task';

 
@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private baseUrl = 'https://localhost:44336/api/task';
 
  constructor(private http: HttpClient) {} 
  
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
    
  addTask(task: TaskRequest): Observable<TaskRequest> {
    return this.http.post<TaskRequest>(this.baseUrl, task);
  } 
  
  updateTask(id: string, task: TaskRequest): Observable<TaskRequest> {
    console.log('tarearequest', task);
    return this.http.put<TaskRequest>(`${this.baseUrl}/${id}`, task);
  }
  
  deleteTask(id: number): Observable<TaskRequest> {
    return this.http.delete<TaskRequest>(`${this.baseUrl}/${id}`);
  }
}
 