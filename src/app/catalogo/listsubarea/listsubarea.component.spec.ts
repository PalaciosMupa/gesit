import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubareaComponent } from './listsubarea.component';

describe('ListsubareaComponent', () => {
  let component: ListsubareaComponent;
  let fixture: ComponentFixture<ListsubareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
