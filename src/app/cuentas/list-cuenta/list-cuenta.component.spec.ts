import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuentaComponent } from './list-cuenta.component';

describe('ListCuentaComponent', () => {
  let component: ListCuentaComponent;
  let fixture: ComponentFixture<ListCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
