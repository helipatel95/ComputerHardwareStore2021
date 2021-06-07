import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblySelectionComponent } from './assembly-selection.component';

describe('AssemblySelectionComponent', () => {
  let component: AssemblySelectionComponent;
  let fixture: ComponentFixture<AssemblySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
