import { Component } from '@angular/core';
import { Task, TaskRequest } from '../../models/Task';
import { CommonModule} from '@angular/common';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import { TaskApiService } from '../../services/task-api.service';
import { ConfirmDialog } from '../../models/dialog';
import { ConfirmDialogComponent } from '../../dialogs/dialogs/confirm-dialog.component';

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
  
  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { 
        title: '', 
        description: '', 
        isDone: false,
        isEdit: false,
        categories: []
       },
    });
 
    dialogRef.afterClosed().subscribe((result: TaskRequest) => {
      if (result) {
        this.taskApi.addTask(result).subscribe({
          next: (res) => {
            console.log('Tarea añadida:', res);
            this.loadTasks(); 
          },
          error: (err) => {
            console.error('Error al añadir tarea:', err);
          },
        });
      }
    });
  }

  editTask(task: Task): void {
    const id = task.taskId.toString();
    console.log('tarea', task);
    console.log('isdone', task.isDone);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        title: task.title,
        description: task.description,
        isDone: task.isDone,
        isEdit: true,
        categories: task.categories
       },
    });
 
    dialogRef.afterClosed().subscribe((result: TaskRequest) => {
      if (result) {
        console.log('result', result);
        console.log('tarea', task);
        this.taskApi.updateTask(id, result).subscribe({
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
  
  deleteTask(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Borrar Tarea',
        description: '¿Estás seguro de que deseas borrar esta tarea?',
      } as ConfirmDialog,
    });
   
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskApi.deleteTask(taskId).subscribe({
          next: () => {
            console.log('Tarea eliminada');
            this.loadTasks();
          },
          error: (err) => {
            console.error('Error al eliminar tarea:', err);
          },
        });
      } else {
        console.log('El usuario canceló el borrado');
      }
    });
  }
}
