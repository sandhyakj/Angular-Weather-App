import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { city, weather } from '../types';

import { WeatherService } from './weather.service';


const cities: city[] = [
  {"id": 5128638, "name": "New York", "state": "NY", "country": "US", "coord": {"lon": -75.499901, "lat": 43.000351}},
  {"id": 5368361, "name": "Los Angeles", "state": "CA", "country": "US", "coord": {"lon": -118.243683, "lat": 34.052231}},
  {"id": 1850147, "name": "Tokyo", "state": "", "country": "JP", "coord": {"lon": 139.691711, "lat": 35.689499}}
];

const cityweather: weather = { "coord": { "lon": -0.1278, "lat": 51.5074 }, "weather": [ { "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" } ], "base": "stations", "main": { "temp": 287.57, "feels_like": 286.24, "temp_min": 285.81, "temp_max": 289, "pressure": 1023, "humidity": 45 }, "visibility": 10000, "wind": { "speed": 3.6, "deg": 20 }, "clouds": { "all": 87 }, "dt": 1650989977, "sys": { "type": 2, "id": 268730, "country": "GB", "sunrise": 1650948127, "sunset": 1651000454 }, "timezone": 3600, "id": 2643743, "name": "London", "cod": 200 };


describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientModule],
        providers: [WeatherService]
      }
      );
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get major cities', () => {
    let majorcitiesMock = spyOn(service, 'getMajorCities').withArgs()
    .and.returnValue(of(cities))

    service.getMajorCities().subscribe((data) => {
      expect(data).toEqual(cities);
    }); 
  });

  it('should get cities', () => {
    let citiesMock = spyOn(service, 'getCities').withArgs()
    .and.returnValue(of(cities))

    service.getCities().subscribe((data) => {
      expect(data).toEqual(cities);
    }); 
  });

  it('should get weather by city coordinates', () => {
    let weatherMock = spyOn(service, 'getCurrentWeatherByLatlong').withArgs({ "lon": -0.1278, "lat": 51.5074 },)
    .and.returnValue(of(cityweather))

    service.getCurrentWeatherByLatlong({ "lon": -0.1278, "lat": 51.5074 }).subscribe((data) => {
      expect(data).toEqual(cityweather);
    }); 
  });

});
