import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }, 
    { path: 'tasks', component: TaskPageComponent }      
  ];
  