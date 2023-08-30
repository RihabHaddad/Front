import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcodrivingComponent } from './ecodriving.component';

describe('EcodrivingComponent', () => {
  let component: EcodrivingComponent;
  let fixture: ComponentFixture<EcodrivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcodrivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcodrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
