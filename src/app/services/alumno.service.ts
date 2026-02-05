import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  alumnoEnEdicion!:Alumno

  constructor(private httpClient:HttpClient) 
  {
    //this.httpClient nuestro cliente para interactuar con el API REST (JSON)
   }

   cabeceras: HttpHeaders = new HttpHeaders({'Content-type':'application/json'})
   //GET ALL - LEER TODOS LOS ALUMNOS

   guardarAlumnnoEnEdicion (alumno:Alumno)
   {
    this.alumnoEnEdicion = alumno;//guardamos temporalmente el alumno en edición, como memoria entre los C's alumno y formulario
   }

   leerAlumnoEnEdicion ():Alumno
   {
    return this.alumnoEnEdicion;
  }
   
   // al indicar el tipo de dato que recibo la petición angular automáticamente va de serializar el cuerpo de la respuesta en un array de alumnos   Array<Alumno>
   leerTodosLosAlumnos () : Observable<Array<Alumno>>
   {
     return this.httpClient.get<Array<Alumno>>(RUTA_SERVIDOR_ALUMNOS)
   }

   borrarAlumnoPorId(id:number): Observable<void>
   {
    return this.httpClient.delete<void>(RUTA_SERVIDOR_ALUMNOS+"/"+id)
   }

   crearAlumno(alumno:Alumno): Observable<Alumno>
   {
    return this.httpClient.post<Alumno>(RUTA_SERVIDOR_ALUMNOS, alumno, {headers:this.cabeceras})
   }

   actualizarAlumno(alumno:Alumno): Observable<Alumno>
   {
    return this.httpClient.put<Alumno>(RUTA_SERVIDOR_ALUMNOS+"/"+alumno.id, alumno, {headers:this.cabeceras})
   }
}
