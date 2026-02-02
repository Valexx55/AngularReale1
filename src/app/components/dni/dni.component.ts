import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
/**
 *TODO: NUESTRA APP, TIENE QUE OBTENER EL DNI DEL USUARIO
 Y DECIRLE CUÁL ES SU LETRA
 *
 * @export
 * @class DniComponent
 */
@Component({
  selector: 'app-dni',
  imports: [],
  templateUrl: './dni.component.html',
  styleUrl: './dni.component.css'
})
export class DniComponent implements OnInit, OnDestroy, AfterViewInit{

  numero!:number //non null assertion operator
  letra!:string //otra opción, inicializiar en el constructor y otra en el tsconfig json "strictNullChecks": false

  constructor() {
    /*this.numero = 0
    this.letra= ''*/
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

}
