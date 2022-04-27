import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav-toggler',
  templateUrl: './sidenav-toggler.component.html',
  styleUrls: ['./sidenav-toggler.component.scss']
})
export class SidenavTogglerComponent implements OnInit, OnDestroy {

  constructor(public sideNavService: SidenavService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void{}

}
