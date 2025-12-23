import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'sport',
    loadChildren: () => import('./sportPerformance/sport.routes')
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
