import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskDialog } from '../../models/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class TaskDialogComponent {
  taskForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialog
  ) {
    //TO DO  DA ERROR PQ NO SE ESTA DEVOLVIENDO EL TASK ID
    console.log('datos dialogo',data);
    this.taskForm = this.fb.group({
      title: [data?.title || '', Validators.required],
    description: [data?.description || '', Validators.required],
      isDone: [data?.isDone || false],
    });
  }
 
  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
 
  onCancel(): void {
    this.dialogRef.close();
  }
}
 