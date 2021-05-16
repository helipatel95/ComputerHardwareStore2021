import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAndSpecComponent } from './tech-and-spec.component';

describe('TechAndSpecComponent', () => {
  let component: TechAndSpecComponent;
  let fixture: ComponentFixture<TechAndSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAndSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechAndSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
