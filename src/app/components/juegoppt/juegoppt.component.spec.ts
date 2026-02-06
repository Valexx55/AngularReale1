import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopptComponent } from './juegoppt.component';

describe('JuegopptComponent', () => {
  let component: JuegopptComponent;
  let fixture: ComponentFixture<JuegopptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegopptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegopptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
