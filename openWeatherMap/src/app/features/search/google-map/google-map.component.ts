import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'; 
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { retry, take, tap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { latlong, weather } from 'src/app/types';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  @ViewChild(MapMarker, { static: false }) markerElem!: MapMarker;

  searchField!: string;
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 1,
  }
  markers:any = [];
  infoContent!:weather;

    constructor(public weatherService:WeatherService) { 
    }
  
    ngOnInit(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.addMarker(position.coords.latitude, position.coords.longitude)
      });

      var options = {
          types: ['(cities)']
      };

      // configure autocmplete 
      const input = document.getElementById('searchField') as HTMLInputElement;
      if(input){
        const autocomplete = new google.maps.places.Autocomplete(input , options);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const latlon:any = place.geometry?.location?.toJSON();
          this.addMarker(latlon.lat, latlon.lng);
          this.center ={
            lat: latlon.lat,
            lng: latlon.lng,
          }
        });
      }
    }

    ngOnDestroy(): void{}

    zoomIn() {
      if (this.options.maxZoom && (this.zoom < this.options.maxZoom)) this.zoom++;
    }
  
    zoomOut() {
      if (this.options.minZoom && (this.zoom > this.options.minZoom)) this.zoom--;
    }

    // map click
    click(event: google.maps.MapMouseEvent) {
      if(event.latLng){
        this.addMarker(event.latLng.toJSON().lat, event.latLng.toJSON().lng);
      }      
    }

    // drop marker in chosen location or map click location
    addMarker(lat:number, lng:number) {
      this.markers = [];
      this.weatherService.getCurrentWeatherByLatlong({lat:lat,lon:lng}).pipe(
        take(1),
        retry(2),
        tap((weatherinfo:weather) =>{
          this.markers.push({
            position: {
              lat: weatherinfo.coord.lat,
              lng: weatherinfo.coord.lon,
            },
            label: {
              color: 'white',
              text: weatherinfo.name,
            },
            title: weatherinfo.name,
            info: weatherinfo,
            options: {
              animation: google.maps.Animation.DROP,
            },
          });
        })
      ).subscribe();
    }
}
