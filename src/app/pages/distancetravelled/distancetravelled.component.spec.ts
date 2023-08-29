import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancetravelledComponent } from './distancetravelled.component';

describe('DistancetravelledComponent', () => {
  let component: DistancetravelledComponent;
  let fixture: ComponentFixture<DistancetravelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancetravelledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistancetravelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
