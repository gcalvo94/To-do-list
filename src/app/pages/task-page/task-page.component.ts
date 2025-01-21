import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import { TaskApiService } from '../../services/task-api.service';


@Component({
  selector: 'app-task-page',
  standalone: true,
  
  imports: [CommonModule, MatButtonModule, MatDialogModule, TaskCardComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  tasks: Task[] = [];
  constructor(
    private dialog: MatDialog,
    private taskApi: TaskApiService
  ) {
    this.updateTaskLists();
   }
   ngOnInit(): void {
    this.loadTasks();
  }
 
  // Cargar las tareas desde el backend
  loadTasks(): void {
    this.taskApi.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tareas cargadas:', this.tasks);
        this.updateTaskLists();
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      },
    });
  }

  updateTaskLists(): void {
    this.pendingTasks = this.tasks.filter((task) => !task.isDone);
    this.completedTasks = this.tasks.filter((task) => task.isDone);
  }

  // Añadir una nueva tarea
  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { title: '', description: '', isDone: false },
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskApi.addTask(result).subscribe({
          next: (res) => {
            console.log('Tarea añadida:', res.message);
            this.loadTasks(); // Recargar la lista de tareas
          },
          error: (err) => {
            console.error('Error al añadir tarea:', err);
          },
        });
      }
    });
  }
 
  // Editar una tarea
  editTask(task: Task): void {
    console.log('tarea', task);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { ...task },
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result', result);
        this.taskApi.updateTask(task).subscribe({
          next: (res) => {
            
            this.loadTasks();
          },
          error: (err) => {
            console.error('Error al actualizar tarea:', err);
          },
        });
      }
    });
  }
 
  // Eliminar una tarea
  deleteTask(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta tarea?')) {
      this.taskApi.deleteTask(id).subscribe({
        next: (res) => {
          
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error al eliminar tarea:', err);
        },
      });
    }
  }
}
