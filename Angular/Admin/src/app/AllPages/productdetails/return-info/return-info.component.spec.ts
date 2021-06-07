import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnInfoComponent } from './return-info.component';

describe('ReturnInfoComponent', () => {
  let component: ReturnInfoComponent;
  let fixture: ComponentFixture<ReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
