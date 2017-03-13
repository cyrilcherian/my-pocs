import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotLinklistComponent } from './slot-linklist.component';

describe('SlotLinklistComponent', () => {
  let component: SlotLinklistComponent;
  let fixture: ComponentFixture<SlotLinklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotLinklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotLinklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
