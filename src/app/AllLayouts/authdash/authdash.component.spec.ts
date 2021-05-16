import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthdashComponent } from './authdash.component';

describe('AuthdashComponent', () => {
  let component: AuthdashComponent;
  let fixture: ComponentFixture<AuthdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
