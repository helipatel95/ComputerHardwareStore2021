import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembleyProductPopupComponent } from './assembley-product-popup.component';

describe('AssembleyProductPopupComponent', () => {
  let component: AssembleyProductPopupComponent;
  let fixture: ComponentFixture<AssembleyProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssembleyProductPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembleyProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
