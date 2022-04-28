import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

import { GoogleMapComponent } from './google-map.component';
import { weather, latlong } from 'src/app/types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
const cityweather: weather = { "coord": { "lon": -0.1278, "lat": 51.5074 }, "weather": [ { "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" } ], "base": "stations", "main": { "temp": 287.57, "feels_like": 286.24, "temp_min": 285.81, "temp_max": 289, "pressure": 1023, "humidity": 45 }, "visibility": 10000, "wind": { "speed": 3.6, "deg": 20 }, "clouds": { "all": 87 }, "dt": 1650989977, "sys": { "type": 2, "id": 268730, "country": "GB", "sunrise": 1650948127, "sunset": 1651000454 }, "timezone": 3600, "id": 2643743, "name": "London", "cod": 200 };
class MockWeatherServie {
  getCurrentWeatherByLatlong(latlong:latlong):Observable<any>{
    if(latlong.lat === 999999){
      return of(throwError(() => new Error('test')));
    }
    return of(cityweather);
  }
}

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        { provide: WeatherService, useClass: MockWeatherServie}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    if ('google' in window && typeof google === 'object' && typeof google.maps === 'object'){
      expect(component).toBeTruthy();
    }
  });

  it('should zoomin', () => {
    if ('google' in window && typeof google === 'object' && typeof google.maps === 'object'){
      spyOn(component,'zoomIn').and.callThrough();
      const hostElement: HTMLElement = fixture.nativeElement;
      let buttonElements: HTMLCollectionOf<HTMLButtonElement> = hostElement.getElementsByTagName('button')!;
      buttonElements[0].click();
      expect(component.zoomIn).toHaveBeenCalled();
    }
  });

  it('should zoomout', () => {
    if ('google' in window && typeof google === 'object' && typeof google.maps === 'object'){
      spyOn(component,'zoomOut').and.callThrough();
      const hostElement: HTMLElement = fixture.nativeElement;
      let buttonElements: HTMLCollectionOf<HTMLButtonElement> = hostElement.getElementsByTagName('button')!;
      buttonElements[1].click();
      expect(component.zoomOut).toHaveBeenCalled();
    }
  });

  it('should display weather for clicked location', () => {
    if ('google' in window && typeof google === 'object' && typeof google.maps === 'object'){
      let weatherService = TestBed.inject(WeatherService);
      let spy = spyOn(weatherService, 'getCurrentWeatherByLatlong').and.callThrough();
      component.addMarker(-0.1278, 51.5074);
      expect(spy).toHaveBeenCalled();
    }

  });

});
