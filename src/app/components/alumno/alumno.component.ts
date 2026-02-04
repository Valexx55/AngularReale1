import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-alumno',
  imports: [],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit {

  //alumnoService2: AlumnoService = inject(AlumnoService) //forma moderna

  lista_alumnos!: Array<Alumno>

 // observerAlumnos: Observer<Alumno>

  constructor(public alumnoService:AlumnoService)
  {
    //this.alumnoService //me traerá los datos por HTTP
  }
  ngOnInit(): void {
    // sí mi componente recibe datos de un servicio lo suyo es pedirlos dentro de este método 

    this.alumnoService.leerTodosLosAlumnos().subscribe(
      {
        complete: () => console.log('Comunicación terminada'),
        next: (lista_alumnos_rx) => {
          console.log('Lista alumnos rx con ' + lista_alumnos_rx.length + 'alumnos')
        },
        error: (errror_rx) => console.error(errror_rx)
      }
    )
  }





}
