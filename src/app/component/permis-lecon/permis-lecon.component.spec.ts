import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisLeconComponent } from './permis-lecon.component';

describe('PermisLeconComponent', () => {
  let component: PermisLeconComponent;
  let fixture: ComponentFixture<PermisLeconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisLeconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisLeconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
