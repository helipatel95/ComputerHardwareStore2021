import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesPrductsComponent } from './images-prducts.component';

describe('ImagesPrductsComponent', () => {
  let component: ImagesPrductsComponent;
  let fixture: ComponentFixture<ImagesPrductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesPrductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesPrductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
