import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvenComponent } from './listinven.component';

describe('ListinvenComponent', () => {
  let component: ListinvenComponent;
  let fixture: ComponentFixture<ListinvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinvenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
