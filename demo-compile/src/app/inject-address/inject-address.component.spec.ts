/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InjectAddressComponent } from './inject-address.component';

describe('InjectAddressComponent', () => {
  let component: InjectAddressComponent;
  let fixture: ComponentFixture<InjectAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
