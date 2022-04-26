import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { city, latlong, weather } from '../types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '5d0ec1f5b3c038967eb0cb5b2e6c263b';

  constructor(
    private http: HttpClient,
  ) {}
 
  getMajorCities():Observable<city[]>{
    return this.http.get<city[]>('assets/json/majorcities.json').pipe(map(val=>val));
  }

  getCurrentWeatherByLatlong(latlong:latlong):Observable<weather>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlong.lat}&lon=${latlong.lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<weather>(url);
  }

  getCities():Observable<city[]>{
    return this.http.get<city[]>('assets/json/current.city.list.json');
  }
}
