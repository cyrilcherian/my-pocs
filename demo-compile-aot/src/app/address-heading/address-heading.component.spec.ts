import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressHeadingComponent } from './address-heading.component';

describe('AddressHeadingComponent', () => {
  let component: AddressHeadingComponent;
  let fixture: ComponentFixture<AddressHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
