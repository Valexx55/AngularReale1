//import { NgIf } from '@angular/common';//si lo hiciera con la directiva *ngIf
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 *TODO: NUESTRA APP, TIENE QUE OBTENER EL DNI DEL USUARIO
 Y DECIRLE CUÁL ES SU LETRA
 *
 * @export
 * @class DniComponent
 */
@Component({
  selector: 'app-dni',
  imports: [FormsModule/*, NgIf*/],
  templateUrl: './dni.component.html',
  styleUrl: './dni.component.css'
})
export class DniComponent implements OnInit, OnDestroy, AfterViewInit{

  titulo:string;
  //numero!:number //non null assertion operator
  numero: number | null; //UNION TYPE
  letra!:string //otra opción, inicializiar en el constructor y otra en el tsconfig json "strictNullChecks": false

  static readonly SECUENCIA_LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  constructor() {
    /*this.numero = 0
    this.letra= ''*/
    this.titulo = 'CALCULAR LA LETRA DEL DNI'
    this.numero = null
    this.letra = ""
    console.log("En el constructor de DNI ")
  }
  ngOnInit(): void {
   console.log("En ngOnInit de DNI ")
  }
  ngOnDestroy(): void {
    console.log("En ngOnDestroy de DNI ")
  }

  //onload a nivel de C
  ngAfterViewInit(): void {
    console.log("En ngAfterViewInit de DNI ")
  }

  calcularLetraDni()
  {
    console.log(`El dni es ${this.numero}`)

    if (this.numero != null)
    {
      //leemos el radio seleccionado
      let radioSeleccionado = <HTMLInputElement> document.querySelector('[name="prefijo"]:checked');
      console.log(`Valor seleccionado ${radioSeleccionado.value}`)

      if (radioSeleccionado.value!='sin')
        {
          //caso extranjero
          let numaux:number = parseInt(radioSeleccionado.value+this.numero)
          let resto:number = numaux%DniComponent.SECUENCIA_LETRAS_DNI.length;
          this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto)
        } else {
          //caso nacional
          let resto:number = this.numero%DniComponent.SECUENCIA_LETRAS_DNI.length;
          this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto)
        }
      
        console.log(`La letra es ${this.letra}`)

    }

  }

}
