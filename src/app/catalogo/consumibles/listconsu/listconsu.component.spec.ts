import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsuComponent } from './listconsu.component';

describe('ListconsuComponent', () => {
  let component: ListconsuComponent;
  let fixture: ComponentFixture<ListconsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
