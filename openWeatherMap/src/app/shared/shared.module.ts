import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
    WeatherComponent
  ],
    imports: [
        PanelModule,
        CardModule,
        DropdownModule,
        CommonModule
    ],
    exports:[PanelModule, CardModule,DropdownModule, WeatherComponent],
    providers: []
  })
  export class SharedModule { }