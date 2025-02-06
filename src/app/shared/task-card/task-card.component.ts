import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>(); 
  
  onEdit(): void {
    console.log('task', this.task);
    this.edit.emit(this.task);
  }
 
  onDelete(): void {
    this.delete.emit(this.task.taskId);
  }
}
