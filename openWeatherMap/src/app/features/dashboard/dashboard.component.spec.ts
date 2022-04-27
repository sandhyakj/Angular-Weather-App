import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { map, Observable, of, tap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { city, weather, latlong } from 'src/app/types';

import { DashboardComponent } from './dashboard.component';

const majorCities: city[] = [
  {"id": 2643743, "name": "London", "state": "", "country": "GB", "coord": {"lon": -0.12574, "lat": 51.50853}},
  {"id": 2968815, "name": "Paris", "state": "", "country": "FR", "coord": {"lon": 2.3486, "lat": 48.853401}}
];

const cities: city[] = [
  {"id": 5128638, "name": "New York", "state": "NY", "country": "US", "coord": {"lon": -75.499901, "lat": 43.000351}},
  {"id": 5368361, "name": "Los Angeles", "state": "CA", "country": "US", "coord": {"lon": -118.243683, "lat": 34.052231}},
  {"id": 1850147, "name": "Tokyo", "state": "", "country": "JP", "coord": {"lon": 139.691711, "lat": 35.689499}}
];

const cityweather: weather = { "coord": { "lon": -0.1278, "lat": 51.5074 }, "weather": [ { "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" } ], "base": "stations", "main": { "temp": 287.57, "feels_like": 286.24, "temp_min": 285.81, "temp_max": 289, "pressure": 1023, "humidity": 45 }, "visibility": 10000, "wind": { "speed": 3.6, "deg": 20 }, "clouds": { "all": 87 }, "dt": 1650989977, "sys": { "type": 2, "id": 268730, "country": "GB", "sunrise": 1650948127, "sunset": 1651000454 }, "timezone": 3600, "id": 2643743, "name": "London", "cod": 200 };

class MockWeatherServie {
  getMajorCities():Observable<city[]>{
    return of(majorCities);
  }

  getCurrentWeatherByLatlong(latlong:latlong):Observable<weather>{
    return of(cityweather);
  }

  getCities():Observable<city[]>{
    return of(cities);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        {provide: WeatherService, useClass: MockWeatherServie}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get major cities', () => {    
    let weatherService = TestBed.inject(WeatherService);
    let majorcityarray:city[]= [];
    component.majorCitie$.pipe(tap(val=>{
      majorcityarray = [...val];
    })).subscribe();
    spyOn(weatherService, 'getMajorCities').and.callThrough().and.returnValue(of(majorCities));
    expect(majorcityarray).toEqual(majorCities);
  });

  it('should get major city weather', () => {    
    let weatherService = TestBed.inject(WeatherService);
    let majorcityweather:weather = { "coord": { "lon": 139.6917, "lat": 35.6895 }, "weather": [ { "id": 520, "main": "Rain", "description": "light intensity shower rain", "icon": "09n" } ], "base": "stations", "main": { "temp": 295.55, "feels_like": 296.09, "temp_min": 293.59, "temp_max": 296.83, "pressure": 1003, "humidity": 86 }, "visibility": 10000, "wind": { "speed": 14.92, "deg": 210, "gust": 21.61 }, "rain": { "1h": 0.12 }, "clouds": { "all": 75 }, "dt": 1650989664, "sys": { "type": 2, "id": 2038398, "country": "JP", "sunrise": 1651002852, "sunset": 1651051405 }, "timezone": 32400, "id": 1850144, "name": "Tokyo", "cod": 200 };
    component.majorCitiesWeather$.pipe(tap(val=>{
      majorcityweather = {...cityweather};
    })).subscribe();
    spyOn(weatherService, 'getCurrentWeatherByLatlong').and.callThrough().and.returnValue(of(majorcityweather));
    expect(majorcityweather).toEqual(cityweather);
  });

});
