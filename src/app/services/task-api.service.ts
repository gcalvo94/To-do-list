import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

 
@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private baseUrl = 'https://localhost:44336/api/task';
 
  constructor(private http: HttpClient) {}
 
  // Obtener todas las tareas (GET)
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
  // Insertar nueva tarea
  addTask(task: Task): Observable<any> {
    return this.http.post<any>(this.baseUrl, task);
  }
 
  // Actualizar una tarea (PUT)
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
  // Eliminar tarea por ID
  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
 