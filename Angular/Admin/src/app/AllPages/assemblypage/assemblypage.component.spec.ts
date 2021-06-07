import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblypageComponent } from './assemblypage.component';

describe('AssemblypageComponent', () => {
  let component: AssemblypageComponent;
  let fixture: ComponentFixture<AssemblypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
