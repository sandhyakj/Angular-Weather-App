import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      imports: [
        HttpClientTestingModule 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;

    // find the DebugElement and element
    component.cityweather = {
      "coord": {
        "lon": -122.08,
        "lat": 37.39
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
      },
      "visibility": 10000,
      "wind": {
        "speed": 1.5,
        "deg": 350
      },
      "clouds": {
        "all": 1
      },
      "dt": 1560350645,
      "sys": {
        "type": 1,
        "id": 5122,
        "message": 0.0139,
        "country": "US",
        "sunrise": 1560343627,
        "sunset": 1560396563
      },
      "timezone": -25200,
      "id": 420006353,
      "name": "Mountain View",
      "cod": 200
      };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get image for weather', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const imgelement: HTMLImageElement = hostElement.querySelector('img')!;
    expect(imgelement.src).toBe("http://openweathermap.org/img/wn/01d@2x.png");
  });

  describe('should have right background based on temperature', () => {
    it('very cool', () => {
      component.cityweather.main.temp = 8;
      component.ngOnChanges();
      const hostElement: HTMLElement = fixture.nativeElement;
      expect(component.colorclass).toEqual('verycool');
    });

    it('cool', () => {
      component.cityweather.main.temp = 18;
      component.ngOnChanges();
      const hostElement: HTMLElement = fixture.nativeElement;
      expect(component.colorclass).toEqual('cool');
    });

    it('hot', () => {
      component.cityweather.main.temp = 28;
      component.ngOnChanges();
      const hostElement: HTMLElement = fixture.nativeElement;
      expect(component.colorclass).toEqual('hot');
    });

    it('very hot', () => {
      component.cityweather.main.temp = 38;
      component.ngOnChanges();
      const hostElement: HTMLElement = fixture.nativeElement;
      expect(component.colorclass).toEqual('veryhot');
    });

    it('extreme hot', () => {
      component.cityweather.main.temp = 48;
      component.ngOnChanges();
      const hostElement: HTMLElement = fixture.nativeElement;
      expect(component.colorclass).toEqual('extremehot');
    });

  });
});
