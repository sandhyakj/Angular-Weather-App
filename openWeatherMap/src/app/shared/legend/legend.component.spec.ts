import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispaly all legend elements', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    let svgElements: HTMLCollectionOf<Element> = hostElement.getElementsByTagName('svg')!;
    expect(svgElements.length).toEqual(6);
  });

});
