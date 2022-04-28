import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { city, weather, latlong } from 'src/app/types';

import { CityComponent } from './city.component';

const cities: city[] = [
  {"id": 5128638, "name": "New York", "state": "NY", "country": "US", "coord": {"lon": -75.499901, "lat": 43.000351}},
  {"id": 5368361, "name": "Los Angeles", "state": "CA", "country": "US", "coord": {"lon": -118.243683, "lat": 34.052231}},
  {"id": 1850147, "name": "Tokyo", "state": "", "country": "JP", "coord": {"lon": 139.691711, "lat": 35.689499}}
];

const cityweather: weather = { "coord": { "lon": -0.1278, "lat": 51.5074 }, "weather": [ { "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" } ], "base": "stations", "main": { "temp": 287.57, "feels_like": 286.24, "temp_min": 285.81, "temp_max": 289, "pressure": 1023, "humidity": 45 }, "visibility": 10000, "wind": { "speed": 3.6, "deg": 20 }, "clouds": { "all": 87 }, "dt": 1650989977, "sys": { "type": 2, "id": 268730, "country": "GB", "sunrise": 1650948127, "sunset": 1651000454 }, "timezone": 3600, "id": 2643743, "name": "London", "cod": 200 };

class MockWeatherServie {

  getCurrentWeatherByLatlong(latlong:latlong):Observable<any>{
    if(latlong.lat === 999999){
      return of(throwError(() => new Error('test')));
    }
    return of(cityweather);
  }

  getCities():Observable<city[]>{
    return of(cities);
  }
}

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        {provide: WeatherService, useClass: MockWeatherServie}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cities list', () => {
    expect(component.cities.length).toBeGreaterThanOrEqual(1);
  });

  it('should get weather for selected city', () => {
    let weatherService = TestBed.inject(WeatherService);
    component.selectedCity = {"id": 5128638, "name": "New York", "state": "NY", "country": "US", "coord": {"lon": -75.499901, "lat": 43.000351}};
    component.displayWeather(component.selectedCity);
    expect(component.selectedCityWeather).not.toBeNull();
  });

  it('should throw error for wrong co-ordinates', () => {
    let weatherService = TestBed.inject(WeatherService);
    component.selectedCity = {"id": 5128638, "name": "New York", "state": "NY", "country": "US", "coord": {"lon": -75.499901, "lat": 999999}};
    component.displayWeather(component.selectedCity);
    spyOn(weatherService, 'getCurrentWeatherByLatlong').and.throwError;
    expect(component.selectedCityWeather.id).toBeUndefined();
  });
  
});
