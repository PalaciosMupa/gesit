import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrepueComponent } from './listrepue.component';

describe('ListrepueComponent', () => {
  let component: ListrepueComponent;
  let fixture: ComponentFixture<ListrepueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrepueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrepueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
