import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAssembleyComponent } from './list-of-assembley.component';

describe('ListOfAssembleyComponent', () => {
  let component: ListOfAssembleyComponent;
  let fixture: ComponentFixture<ListOfAssembleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAssembleyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAssembleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
