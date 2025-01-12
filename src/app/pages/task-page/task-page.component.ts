import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, TaskCardComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'First Task',
      task: 'This is the description of the first task.',
      isDone: false,
      userImage: 'https://i.pravatar.cc/50?img=1',
    },
    {
      id: 2,
      title: 'Second Task',
      task: 'This is the description of the second task.',
      isDone: true,
      userImage: 'https://i.pravatar.cc/50?img=2',
    },
  ];
  constructor(
    private dialog: MatDialog
  ) { }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      height: 'auto',
      data: { title: '', description: '', isDone: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Añadir la nueva tarea a la lista
        const newTask: Task = {
          id: this.tasks.length + 1,
          title: result.title,
          task: result.description,
          isDone: result.isDone,
          userImage: 'https://i.pravatar.cc/50?img=1', // Simulación
        };
        this.tasks.push(newTask);
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { title: task.title, description: task.task, isDone: task.isDone },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        task.title = result.title;
        task.task = result.description;
        task.isDone = result.isDone;
      }
    });
  }
}
