import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LegendComponent } from './legend/legend.component';
@NgModule({
    declarations: [
    WeatherComponent,
    LegendComponent
  ],
    imports: [
        PanelModule,
        CardModule,
        DropdownModule,
        CommonModule,
        ProgressSpinnerModule
    ],
    exports:[PanelModule, CardModule,DropdownModule,  ProgressSpinnerModule, WeatherComponent, LegendComponent],
    providers: []
  })
  export class SharedModule { }