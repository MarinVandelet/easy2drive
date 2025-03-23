import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurExamenComponent } from './moniteur-examen.component';

describe('MoniteurExamenComponent', () => {
  let component: MoniteurExamenComponent;
  let fixture: ComponentFixture<MoniteurExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoniteurExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoniteurExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
