import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExamenComponent } from './code-examen.component';

describe('CodeExamenComponent', () => {
  let component: CodeExamenComponent;
  let fixture: ComponentFixture<CodeExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
