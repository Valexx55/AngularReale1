import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniComponent } from './dni.component';

describe('DniComponent', () => {
  let component: DniComponent;
  let fixture: ComponentFixture<DniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DniComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    //fixture.autoDetectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('caso dni español correcto', () => {

    component.numero = 53130984;
    //component.prefijo="sin";
    component.calcularLetraDni();
    expect(component.letra).toBe("H");
  });

  it('sección letra visible tras calculo', () => {

    component.numero = 53130984;
    //component.prefijo="sin";
    component.calcularLetraDni();
    //expect(component.letra).toBe("H");
    fixture.detectChanges();//ACTULICE EL COMPOENNTE/SU ESTADO/LA PLANTILLA
    //compruebo que la sección div de la letra existe
    expect(fixture.nativeElement.querySelector("#cajaLetra").innerHTML).toContain("Su letra es");

  });


});
