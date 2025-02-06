import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskDialog } from '../../models/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Category } from '../../models/Category';
import { CategoryApiService } from '../../services/category-api.service';
import { MatSelectModule } from '@angular/material/select';
 
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
    MatSelectModule,
  ],
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  categoriesControl = new FormControl<Category[]>([]);
  availableCategories: Category[] = [];
 
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialog,
    private categoryApi: CategoryApiService
  ) {
    this.taskForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      isDone: [data.isDone],
    });
    if (data.isEdit && data.categories) {
      this.categoriesControl.setValue(data.categories);
    }
    this.categoryApi.getCategories().subscribe({
      next: (cats) => {
        this.availableCategories = cats;
      },
      error: (err) => console.error(err),
    });
  }
 
  compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.categoryId === c2.categoryId : c1 === c2;
  }
 
  save(): void {
    if (this.taskForm.valid) {
      const selectedCategories = this.categoriesControl.value || [];
      this.dialogRef.close({
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isDone: this.taskForm.value.isDone ?? this.data.isDone,
        categories: selectedCategories
      });
    }
  }
 
  onCancel(): void {
    this.dialogRef.close();
  }
}