import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBrandsComponent } from './display-brands.component';

describe('DisplayBrandsComponent', () => {
  let component: DisplayBrandsComponent;
  let fixture: ComponentFixture<DisplayBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
