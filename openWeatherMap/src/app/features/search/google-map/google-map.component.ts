import { Component, OnInit, ViewChild } from '@angular/core';
import {MessageService} from 'primeng/api';
import {OverlayPanel} from "primeng/overlaypanel";

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    
    constructor() {}
  
    ngOnInit(): void {
  
    }
}
