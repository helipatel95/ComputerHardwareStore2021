import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureInfoComponent } from './manufacture-info.component';

describe('ManufactureInfoComponent', () => {
  let component: ManufactureInfoComponent;
  let fixture: ComponentFixture<ManufactureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
