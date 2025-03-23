import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeconsComponent } from './admin-lecons.component';

describe('AdminLeconsComponent', () => {
  let component: AdminLeconsComponent;
  let fixture: ComponentFixture<AdminLeconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLeconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
