import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { Routes, provideRouter } from '@angular/router';
import { TaskPageComponent } from './app/pages/task-page/task-page.component';
import { provideHttpClient } from '@angular/common/http';
 
const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskPageComponent }  
];
 
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideAnimations(), 
    provideRouter(routes),   
    ...(appConfig.providers || []),
  ],
}).catch((err) => console.error(err));