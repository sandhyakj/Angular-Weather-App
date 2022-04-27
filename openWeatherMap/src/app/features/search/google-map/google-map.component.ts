import { Component, OnInit, OnDestroy } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
    
    constructor() {}
  
    ngOnInit(): void {}

    ngOnDestroy(): void{}
}
