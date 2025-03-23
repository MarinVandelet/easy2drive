import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisExamenComponent } from './permis-examen.component';

describe('PermisExamenComponent', () => {
  let component: PermisExamenComponent;
  let fixture: ComponentFixture<PermisExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
