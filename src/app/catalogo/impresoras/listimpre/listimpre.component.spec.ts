import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListimpreComponent } from './listimpre.component';

describe('ListimpreComponent', () => {
  let component: ListimpreComponent;
  let fixture: ComponentFixture<ListimpreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListimpreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListimpreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
