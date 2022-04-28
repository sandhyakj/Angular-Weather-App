import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
    declarations: [
    WeatherComponent
  ],
    imports: [
        PanelModule,
        CardModule,
        DropdownModule,
        CommonModule,
        ProgressSpinnerModule
    ],
    exports:[PanelModule, CardModule,DropdownModule,  ProgressSpinnerModule, WeatherComponent],
    providers: []
  })
  export class SharedModule { }