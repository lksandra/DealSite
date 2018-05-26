import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealUploadFormComponent } from './deal-upload-form.component';

describe('DealUploadFormComponent', () => {
  let component: DealUploadFormComponent;
  let fixture: ComponentFixture<DealUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealUploadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
