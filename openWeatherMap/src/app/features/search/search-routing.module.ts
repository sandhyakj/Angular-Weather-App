import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SearchComponent } from './search.component';
const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'googlemap',
    component: GoogleMapComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}