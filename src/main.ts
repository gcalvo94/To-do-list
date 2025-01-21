import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';
import { TaskPageComponent } from './app/pages/task-page/task-page.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirige la raíz a /tasks
  { path: 'tasks', component: TaskPageComponent }      // Carga TaskPageComponent
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(), // Proveer HttpClient aquí
    ...(appConfig.providers || []), // Mantener otros providers existentes
  ],
}).catch((err) => console.error(err));
