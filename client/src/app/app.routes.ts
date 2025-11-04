import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/stations', pathMatch: 'full' },
  { path: 'stations', loadComponent: () => import('./components/stations/stations.component').then(m => m.StationsComponent) },
  { path: 'carburants', loadComponent: () => import('./components/carburants/carburants.component').then(m => m.CarburantsComponent) },
  { path: 'histocarb', loadComponent: () => import('./components/histocarb/histocarb.component').then(m => m.HistocarbComponent) }
];
