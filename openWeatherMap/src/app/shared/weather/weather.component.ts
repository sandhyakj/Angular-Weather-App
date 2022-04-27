import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { weather } from 'src/app/types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Input()
  cityweather!: weather;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{}
  
  getImgUrl(icon:string){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
