import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotImagelistComponent } from './slot-imagelist.component';

describe('SlotImagelistComponent', () => {
  let component: SlotImagelistComponent;
  let fixture: ComponentFixture<SlotImagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotImagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotImagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
