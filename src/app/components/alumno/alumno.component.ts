import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { Observer } from 'rxjs';
import { DatePipe } from '@angular/common';
import {NgIcon, provideIcons} from '@ng-icons/core'
import { heroTrashSolid } from '@ng-icons/heroicons/solid';
import { bootstrapPencilFill } from '@ng-icons/bootstrap-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alumno',
  imports: [DatePipe, NgIcon, RouterLink],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
  providers: [
    provideIcons({
      heroTrashSolid,
      bootstrapPencilFill
    })
  ]
})
export class AlumnoComponent implements OnInit {

  //alumnoService2: AlumnoService = inject(AlumnoService) //forma moderna

  lista_alumnos!: Array<Alumno>

 observerAlumnos!: Observer<Alumno> 


  constructor(public alumnoService:AlumnoService)
  {
    //this.alumnoService //me traerá los datos por HTTP
    /*this.observerAlumnos = {
        complete: () => console.log('Comunicación terminada'),
        next: (lista_alumnos_rx: Array<Alumno>) => {
          console.log('Lista alumnos rx con ' + lista_alumnos_rx.length + ' alumnos')
          this.lista_alumnos = lista_alumnos_rx;
        },
        error: (errror_rx) => console.error(errror_rx)
      }*/
  }
  ngOnInit(): void {
    // sí mi componente recibe datos de un servicio lo suyo es pedirlos dentro de este método 

    this.alumnoService.leerTodosLosAlumnos().subscribe(
      {
        complete: () => console.log('Comunicación terminada'),
        next: (lista_alumnos_rx) => {
          console.log('Lista alumnos rx con ' + lista_alumnos_rx.length + ' alumnos')
          this.lista_alumnos = lista_alumnos_rx;
          
        },
        error: (errror_rx) => console.error(errror_rx)
      }
    )
  }

borrarAlumno(idBorrar:number)
{

  console.log("Ha tocado borrar el " + idBorrar)
  if (confirm(`¿Deseas eliminar al alumno ${idBorrar}`))
  {
    this.alumnoService.borrarAlumnoPorId(idBorrar).subscribe(
       {
        complete: () => console.log('Comunicación terminada'),
        next: () => {
          console.log('Alumno borrado')
          //TODO: borrar al alumno del listado
           this.lista_alumnos = this.lista_alumnos.filter(a => a.id!=idBorrar)
          
          },
        error: (errror_rx) => console.error(errror_rx)
      }
    )

  } else {
    console.log("Cancela borrado")
  }

}

editarAlumno(idEditar:number){

}



}
