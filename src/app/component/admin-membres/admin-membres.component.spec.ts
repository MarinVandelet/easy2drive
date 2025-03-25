import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembresComponent } from './admin-membres.component';

describe('AdminMembresComponent', () => {
  let component: AdminMembresComponent;
  let fixture: ComponentFixture<AdminMembresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMembresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
