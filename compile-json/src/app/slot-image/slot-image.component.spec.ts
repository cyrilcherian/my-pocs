import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotImageComponent } from './slot-image.component';

describe('SlotImageComponent', () => {
  let component: SlotImageComponent;
  let fixture: ComponentFixture<SlotImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
