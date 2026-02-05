import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-alumno',
  imports: [FormsModule],
  templateUrl: './formulario-alumno.component.html',
  styleUrl: './formulario-alumno.component.css'
})
export class FormularioAlumnoComponent implements OnInit {

  alumno!:Alumno
  observador: Observer<Alumno>;
  enEdicion!:Boolean;//para saber si he llegado al C para crear o Editar

  //Router //consigo gestionar la navegación de forma programática
  //ActivatedRoute // consigo acceder al location HREF desde Angular
  constructor(private alumnoService:AlumnoService, private router:Router, private ruta:ActivatedRoute)
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
  ngOnInit(): void {
    
    this.enEdicion = this.ruta.snapshot.paramMap.get('id')!=null
    if (this.enEdicion)
    {
      console.log('EN editar alumno')
      this.alumno = this.alumnoService.leerAlumnoEnEdicion()
    } else {
      console.log('EN crear alumno')
    }
  }

  //todo

  estiloBoton ():string
  {
    let estilo:string=""

      if (this.enEdicion)
      {
        estilo = "btn btn-success"
      }else {
        estilo = "btn btn-primary"
      }

    return estilo
  }

  
  editarAlumno()
  {
    this.alumnoService.actualizarAlumno(this.alumno).subscribe(this.observador)
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
