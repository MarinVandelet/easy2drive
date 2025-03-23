import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResultatsComponent } from './admin-resultats.component';

describe('AdminResultatsComponent', () => {
  let component: AdminResultatsComponent;
  let fixture: ComponentFixture<AdminResultatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminResultatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
