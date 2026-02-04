import { Component, inject } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno',
  imports: [],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {

  //alumnoService2: AlumnoService = inject(AlumnoService) //forma moderna

  constructor(public alumnoService:AlumnoService)
  {
    //this.alumnoService //me traerá los datos por HTTP
  }

}
