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
  loading:boolean = false;
  error:boolean = false;
  errormessage:string='';

  constructor(public weatherService:WeatherService) { }

  ngOnInit(): void {
    this.error = false;
      this.weatherService.getCities().pipe(
        tap(cities => this.cities = cities),
        take(1),
        retry(2),
        catchError((e) => {
          console.log("error", e);
          this.error = true;
          this.errormessage = "There was a problem while getting city list";
          return of(e);
        })
      ).subscribe();
  }
  
  ngOnDestroy(): void{}

  // display weather for a selected city
  displayWeather(event: city){
    this.error = false;
    if(event){
      this.loading = true;
      this.getWeatherForCity(event).pipe(
        tap(weather => {
          this.loading = false;
          this.selectedCityWeather = {...weather};
        }),
        take(1),
        retry(2),
        catchError((e) => {
          console.log("error", e);
          this.error = true;
          this.errormessage = "There was a problem while loading the weather information";
          this.loading = false;
          return of(e);
        })
      ).subscribe();
    }
  }

 // call the service method display weather for a selected city
  getWeatherForCity(city:city){
    return this.weatherService.getCurrentWeatherByLatlong(city.coord);
  }
}
