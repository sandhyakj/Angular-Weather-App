import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, forkJoin, from, map, mergeMap, Observable, of, shareReplay, tap, toArray } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { city, weather } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private weatherService:WeatherService) { }
  majorCitiesWeather$!: Observable<any>;
  majorCitie$!: Observable<city[]>;
  error:boolean = false;
  errormessage:string='';

  ngOnInit(): void {
    this.majorCitie$ = this.weatherService.getMajorCities();
    this.majorCitiesWeather$ = this.getWeather().pipe();
  }
  
  ngOnDestroy(): void{}
  
  // get weather for all cities
  getWeather(){
    this.error = false;
    this.errormessage = '';
    return this.majorCitie$.pipe(
      // first map all the observales make an array for API calls
      mergeMap(values => {
        let apiArray = values.map((city) => {
          return this.getWeatherForCity(city);
        })
        // now you have to make API calls - Alternatively this call can be shifted to child components to load individually.
        return forkJoin([...apiArray]).pipe(
          map((weatherdata) => {
            return weatherdata;
          }),
          catchError((e) => {
              console.log("error", e);
              this.error = true;
              this.errormessage = 'There was a problem while loading weather information';
              return of(e);
          })
        )        
      }),
      shareReplay(),
      catchError((e) => {
        console.log("error", e);
        this.error = true;
        this.errormessage = 'There was a problem while getting major cities for loading weather information';
        return of(e);
    })
    );
  }

  // get weather for a individual city
  getWeatherForCity(city:city){
    return this.weatherService.getCurrentWeatherByLatlong(city.coord);
  }

}
