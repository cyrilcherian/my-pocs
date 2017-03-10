import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLinkComponent } from './address-link.component';

describe('AddressLinkComponent', () => {
  let component: AddressLinkComponent;
  let fixture: ComponentFixture<AddressLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
