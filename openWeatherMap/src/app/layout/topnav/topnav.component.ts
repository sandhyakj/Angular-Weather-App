import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit, OnDestroy {
  title = "Openweathermap";
  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void{}

}
