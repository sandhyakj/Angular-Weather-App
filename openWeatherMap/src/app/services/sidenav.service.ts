import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavItem } from '../types/navitem';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  hideSideNav: boolean = false;
  
  constructor(
    private http: HttpClient,
  ) {}

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }

  getMenuitems():Observable<NavItem[]>{
    return this.http.get<NavItem[]>('assets/json/nav.json');
  }
}


