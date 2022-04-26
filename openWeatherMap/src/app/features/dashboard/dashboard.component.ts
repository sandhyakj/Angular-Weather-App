import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, from, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { city, weather } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private weatherService:WeatherService) { }
  majorCitiesWeather$!: Observable<any>;
  majorCitie$!: Observable<city[]>;

  ngOnInit(): void {
    this.majorCitie$ = this.weatherService.getMajorCities();
    this.majorCitiesWeather$ = this.getWeather().pipe();
  }

  getWeather(){
    return this.majorCitie$.pipe(
      // first map all the observales make an array for API calls
      mergeMap(values => {
        let apiArray = values.map((city) => {
          return this.getWeatherForCity(city);
        })
        // now you have to make API calls
        return forkJoin([...apiArray]).pipe(
          map((weatherdata) => {
            return weatherdata;
          }),
          catchError((e) => {
              console.log("error", e);
              return of(e);
          })
        )        
      })
    );
  }

  getWeatherForCity(city:city){
    return this.weatherService.getCurrentWeatherByLatlong(city.coord);
  }

  getImgUrl(icon:string){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
