import { AlumnoService } from './../../services/alumno.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-alumno',
  imports: [FormsModule],
  templateUrl: './formulario-alumno.component.html',
  styleUrl: './formulario-alumno.component.css'
})
export class FormularioAlumnoComponent {

  alumno!:Alumno
  observador: Observer<Alumno>;

  constructor(private alumnoService:AlumnoService, private router:Router)
  {
    this.alumno = new Alumno()
    
    this.observador = {
      complete: () => console.log('ha terminado'),
      error: (error) => console.error('error = ' + error),
      next: (alumno_nuevo) => {
        console.log(`ID DE ALUMNO nuevo ${alumno_nuevo.id}`);
        alert('Alumno Guardado Correctamente :)');
        //TODO vovler al listado de alumnos, programáticamente
        this.router.navigateByUrl("/alumnos")
      }
    }
  }

  crearAlumno()
  {
    this.alumnoService.crearAlumno(this.alumno).subscribe(this.observador)
    
    /*this.alumnoService.crearAlumno(this.alumno).subscribe({
      complete: () => console.log('ha terminado'),
      error: (error) => console.error('error = ' + error),
      next: (alumno_nuevo) => {
        console.log(`ID DE ALUMNO nuevo ${alumno_nuevo.id}`);
        alert('Alumno Guardado Correctamente :)');

      }
    })*/
    

  }
}
