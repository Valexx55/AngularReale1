import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUTA_SERVIDOR_ALUMNOS } from '../config/app';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

//decordador del servicio. 
// al arrancar angular creará una instancia única de este de esta clase patrón singleton y lo añadirá lo inyectará donde esté solicitado el componente de turno 
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  /**
   * En esta clase, encapsulamos la comunicación HTTP con un servidor
   * 
   * GET ALL - LEER TODOS LOS ALUMNOS
   * GET ID - LEER UN ALUMNO
   * POST - INSERTAR UN ALUMNO EN EL SERIVIDOR
   * PUT - MODIFICAR UN ALUMNO
   * DELETE - BORRAR UN ALUMNO
   * 
   */
  constructor(private httpClient:HttpClient) 
  {
    //this.httpClient nuestro cliente para interactuar con el API REST (JSON)
   }

   //GET ALL - LEER TODOS LOS ALUMNOS

   // al indicar el tipo de dato que recibo la petición angular automáticamente va de serializar el cuerpo de la respuesta en un array de alumnos   Array<Alumno>
   leerTodosLosAlumnos () : Observable<Array<Alumno>>
   {
     return this.httpClient.get<Array<Alumno>>(RUTA_SERVIDOR_ALUMNOS)
   }
}
