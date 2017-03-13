import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotLinkComponent } from './slot-link.component';

describe('SlotLinkComponent', () => {
  let component: SlotLinkComponent;
  let fixture: ComponentFixture<SlotLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
