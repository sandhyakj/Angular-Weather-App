import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import { CityComponent } from './city/city.component';

import {FormsModule} from '@angular/forms';  
import {GMapModule} from 'primeng/gmap';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview'; 
import {SharedModule} from '../../shared/shared.module'; 
import {GoogleMapsModule } from '@angular/google-maps'
@NgModule({
  declarations: [
    SearchComponent,
    GoogleMapComponent,
    CityComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    GMapModule,
    FormsModule,
        GMapModule,
        ToastModule,
        InputTextModule,
        CheckboxModule,
        DialogModule,
        ButtonModule,
        TabViewModule,
        SharedModule,
        GoogleMapsModule
  ]
})
export class SearchModule { }
