import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
