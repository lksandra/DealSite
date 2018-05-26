import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedDealsComponent } from './most-viewed-deals.component';

describe('MostViewedDealsComponent', () => {
  let component: MostViewedDealsComponent;
  let fixture: ComponentFixture<MostViewedDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewedDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
