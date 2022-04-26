import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadService } from './services/custom-preload.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
  path: 'dashboard',
  loadChildren: () =>
    import('./features/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then(
        (m) => m.SearchModule
      ),
    data:{preload: true, delay:1000}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
