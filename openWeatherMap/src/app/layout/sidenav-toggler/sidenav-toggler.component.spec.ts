import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavTogglerComponent } from './sidenav-toggler.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidenavService } from 'src/app/services/sidenav.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SidenavTogglerComponent', () => {
  let component: SidenavTogglerComponent;
  let fixture: ComponentFixture<SidenavTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavTogglerComponent ],
      imports: [
        HttpClientTestingModule 
      ],
      providers:[SidenavService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav', () => {
    let sidenavservice = TestBed.inject(SidenavService);
    let spy = spyOn(sidenavservice, 'toggleSideNav').and.callThrough();
    const hostElement: HTMLElement = fixture.nativeElement;
    const buttonElement: HTMLButtonElement = hostElement.querySelector('button')!;
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

});
