import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurLeconComponent } from './moniteur-lecon.component';

describe('MoniteurLeconComponent', () => {
  let component: MoniteurLeconComponent;
  let fixture: ComponentFixture<MoniteurLeconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoniteurLeconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoniteurLeconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
