import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NavItem } from 'src/app/types/navitem';
import { SidenavService  } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navitems$!: Observable<NavItem[]>;
  constructor(public sideNavService: SidenavService) { }

  ngOnInit(): void {
    this.navitems$ = this.sideNavService.getMenuitems().pipe(
      map( (navitems) =>navitems)
    );
  }

}
