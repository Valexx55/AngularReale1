import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Marcador } from '../../models/marcador';

@Component({
  selector: 'app-marcador',
  standalone: true,
  imports: [],
  templateUrl: './marcador.component.html',
  styleUrl: './marcador.component.css'
})
export class MarcadorComponent {

  marcadorActual!: Marcador;
  @Input() nombreJugadorMarcador!: string;
  @Output() emisorMarcador: EventEmitter<Marcador>;

  constructor() {
    console.log("en el constrcutor MarcadorComponent");
    this.marcadorActual = new Marcador();
    this.nombreJugadorMarcador = "";
    this.emisorMarcador = new EventEmitter<Marcador>();
  }

  saludoMarcador() {
    console.log("en saludoMarcador MarcadorComponent");
  }

  borrarMarcador() {
    this.marcadorActual.puntuacion_jugador = 0;
    this.marcadorActual.puntuacion_maquina = 0;
  }

  actualizarMarcador(resultado: number): void {
    //el resultado es -1 0 y 1 significa que 
    //-1 ha ganado la máquina
    //0 hay empate -- sumamos un punto a cada uno
    //1 ha ganado el jugador
    switch (resultado) {
      case -1:
        this.marcadorActual.puntuacion_maquina = this.marcadorActual.puntuacion_maquina + 1;
        break;

      case 0:
        this.marcadorActual.puntuacion_maquina = this.marcadorActual.puntuacion_maquina + 1;
        this.marcadorActual.puntuacion_jugador = this.marcadorActual.puntuacion_jugador + 1;

        break;

      case 1:
        this.marcadorActual.puntuacion_jugador = this.marcadorActual.puntuacion_jugador + 1;
        break;
    }

    this.emisorMarcador.emit(this.marcadorActual);
  }

}
