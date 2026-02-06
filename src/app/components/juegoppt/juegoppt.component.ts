import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MarcadorComponent } from '../marcador/marcador.component';
import { Marcador } from '../../models/marcador';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-juegoppt',
  imports: [FormsModule, MarcadorComponent],
  templateUrl: './juegoppt.component.html',
  styleUrl: './juegoppt.component.css'
})
export class JuegopptComponent implements OnInit, AfterViewInit {

//ElementRef es un envolotorio de Angular a los elementos web estándar
  @ViewChild('imgpc') imagenpc!:ElementRef<HTMLImageElement>;
  @ViewChildren ('piedra, papel, tijera') botones!:QueryList<ElementRef<HTMLImageElement>>;
  
  
  @ViewChild(MarcadorComponent) marcadorHijo!: MarcadorComponent;

  nombreJugador!:string;

  jugadaUsuario:number;//para saber la jugada 0 1 o 2 -- piedra papel o tijera
  jugadaPc:number;

  jugadoPc:boolean = false;////para controlar si han jugado o no
  jugadoUsuario:boolean = false;

  ids_botones: Array<string> = ["piedra", "papel", "tijera"];
  img_botones: Array<string> = ["rock", "paper", "scissors"];

  tabla_decision: Array<Array<number>> = [ //estructura de datos que permite inferir el resultado
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0]
  ];

  constructor()
  {
    console.log("En el constrcutor de JuegoPPTComponent");
    this.jugadaPc = -1;
    this.jugadaUsuario = -1;
    if (this.imagenpc)
      {
        console.log("constrcutor id img = "  + this.imagenpc.nativeElement.id);
      } else {
        console.log("imagenpc undefined");
      }
    
  }

  ngAfterViewInit(): void {
    console.log("En el ngAfterViewInit de JuegoPPTComponent");
    console.log("ngAfterViewInit id img = "  + this.imagenpc.nativeElement.id);
    console.log("llamando al hijo...");
    this.marcadorHijo.saludoMarcador();
  }
  ngOnInit(): void {
    
    console.log("En el ngOnInit de JuegoPPTComponent");
  }

  
  //generamos un numero aleatorio 0 1 o 2 (piedra papel o tijera)
  obtenerJugadaAleatoriaPC ():number {
    return Math.floor(Math.random() * 3)
  }

  seleccionUsuario (numero:number, evento: Event)
  {
    this.jugadoUsuario = true;
    this.jugadaUsuario = numero;

    //quitar la decoración al resto antes

    this.botones.forEach(imgelement => {
      imgelement.nativeElement.classList.remove("marcada")
    });

    //decorar la nueva selección
    let imagenTocada = <HTMLImageElement> evento.target;// as HTMLImageElement;
    imagenTocada.classList.add("marcada");

  }

  aJugar()
  {
     this.jugadaPc =  this.obtenerJugadaAleatoriaPC();
     //PINTAR LA IMAGEN DE LA JUGADA DE LA MÁQUINA
     let nombreDibujo = this.img_botones[this.jugadaPc];
     this.imagenpc.nativeElement.setAttribute('src', `/img/${nombreDibujo}.png`)
     this.imagenpc.nativeElement.setAttribute('alt', `${nombreDibujo}`)

     let resultado = this.tabla_decision[this.jugadaUsuario][this.jugadaPc];//-1 0 o 1 si gana máquina, empantan o jugador respectivamente

     this.jugadoPc = true;

     setTimeout(()=>this.marcadorHijo.actualizarMarcador(resultado), 500); 



  }


  informarMarcador (marcador_hijo:Marcador)
  {
    let mensaje:string;
    //iformamos por un alerte de quien va ganando
    if (marcador_hijo.puntuacion_jugador > marcador_hijo.puntuacion_maquina)
      {
        mensaje = `${this.nombreJugador} VAS GANANDO`
      } else if (marcador_hijo.puntuacion_jugador < marcador_hijo.puntuacion_maquina)
        {
          mensaje = `${this.nombreJugador} VAS PALMANDO, ÁNIMO`
        } else {
          mensaje = `EMPATE...intríngulis`;
        }
        alert(mensaje)
  }

}

