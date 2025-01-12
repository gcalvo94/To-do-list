import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirige la raíz a /tasks
    { path: 'tasks', component: TaskPageComponent }      // Carga TaskPageComponent
  ];
  