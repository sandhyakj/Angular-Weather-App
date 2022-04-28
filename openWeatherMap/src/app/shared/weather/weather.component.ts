import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { weather } from 'src/app/types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  cityweather!: weather;
  colorclass:string = 'white';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    let temp = this.cityweather?.main?.temp;
    if( temp < 10){
      this.colorclass = 'verycool';
    } else if( temp < 20){
      this.colorclass = 'cool';
    } else if( temp < 30){
      this.colorclass = 'hot';
    } else if( temp < 40){
      this.colorclass = 'veryhot';
    } else if( temp < 50){
      this.colorclass = 'extremehot';
    }
  }

  ngOnDestroy(): void{}

  getImgUrl(icon:string){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
