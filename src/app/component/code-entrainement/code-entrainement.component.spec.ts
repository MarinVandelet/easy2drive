import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEntrainementComponent } from './code-entrainement.component';

describe('CodeEntrainementComponent', () => {
  let component: CodeEntrainementComponent;
  let fixture: ComponentFixture<CodeEntrainementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEntrainementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEntrainementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
