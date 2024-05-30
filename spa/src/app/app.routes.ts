import { Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/hero-list',
    pathMatch: 'full',
  },
  {
    path: 'hero-list',
    component: HeroListComponent,
    pathMatch: 'full',
    title: environment.appName,
  },
];
