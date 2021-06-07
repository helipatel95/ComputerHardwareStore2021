import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealInfoComponent } from './deal-info.component';

describe('DealInfoComponent', () => {
  let component: DealInfoComponent;
  let fixture: ComponentFixture<DealInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
