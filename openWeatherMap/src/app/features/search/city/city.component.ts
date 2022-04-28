import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Observable, of, retry, take, tap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { city, weather } from 'src/app/types';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, OnDestroy {

  cities$!: Observable<city[]>;
  selectedCity!: city;
  cities:city[] = [];
  selectedCityWeather!: weather;

  constructor(public weatherService:WeatherService) { }

  ngOnInit(): void {
      this.weatherService.getCities().pipe(
        tap(cities => this.cities = cities),
        take(1),
        retry(2),
        catchError((e) => {
          console.log("error", e);
          return of(e);
        })
      ).subscribe();
  }
  
  ngOnDestroy(): void{}

  displayWeather(event: city){
    if(event){
      this.getWeatherForCity(event).pipe(
        tap(weather => this.selectedCityWeather = {...weather}),
        take(1),
        retry(2),
        catchError((e) => {
          console.log("error", e);
          return of(e);
        })
      ).subscribe();
    }
  }

  getWeatherForCity(city:city){
    return this.weatherService.getCurrentWeatherByLatlong(city.coord);
  }
}
