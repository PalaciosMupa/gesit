import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsubareaComponent } from './formsubarea.component';

describe('FormsubareaComponent', () => {
  let component: FormsubareaComponent;
  let fixture: ComponentFixture<FormsubareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsubareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
