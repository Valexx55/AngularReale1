import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-formulario-alumno',
  imports: [FormsModule],
  templateUrl: './formulario-alumno.component.html',
  styleUrl: './formulario-alumno.component.css'
})
export class FormularioAlumnoComponent {

  alumno!:Alumno

  constructor()
  {
    this.alumno = new Alumno()
  }

  crearAlumno()
  {

  }
}
