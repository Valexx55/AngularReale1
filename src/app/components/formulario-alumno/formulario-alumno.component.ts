import { AlumnoService } from './../../services/alumno.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { firstValueFrom, Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as AlumnosActions from '../../alumnos/store/alumnos.actions';
import { Store } from '@ngrx/store';

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
  store = inject(Store)

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
        if (this.enEdicion)
        {
          this.store.dispatch(AlumnosActions.updateAlumnosSuccess({alumno:alumno_nuevo}))
        } else {
          this.store.dispatch(AlumnosActions.createAlumnosSuccess({alumno:alumno_nuevo}))
        }
        //TODO vovler al listado de alumnos, programáticamente
        this.router.navigateByUrl("/alumnos")
        sessionStorage.clear()
      }
    }
  }

  async recuperarAlumno(modo:number, idAlumno:number):Promise<Alumno>
  {
    console.log('Recuperando el alumno en modo ' + modo)
    let alumnoEd!:Alumno
    switch (modo)
    {
      case 1: //vía servicio 
       alumnoEd = this.alumnoService.leerAlumnoEnEdicion()
      break;
      case 2: //vía storage
          let alumnoEdJson = sessionStorage.getItem("alumnoed");
          alumnoEd = JSON.parse(alumnoEdJson!)
      break;
      case 3: //vía servidor
          alumnoEd =  await firstValueFrom( this.alumnoService.leerAlumnoPorId(idAlumno));
      break;
    }
    return alumnoEd
  }

  async ngOnInit(): Promise<void> {
    
    //this.enEdicion = this.ruta.snapshot.paramMap.get('id')!=null
    
    let idEdit = this.ruta.snapshot.paramMap.get('id');
    this.enEdicion = !!idEdit
    //de esta forma, pasamos a un boolean el dato y lo negamos !!
    //si es null, al hacer !null --> true y luego !true --> false
    //si es un número , al hacer !5 --> false luego !false --> true 
    

    if (this.enEdicion)
    {
      console.log('EN editar alumno')

      //OJO: Sincronizar con llamada en AlumnoComponent.editarAlumno()
      //con 1 -- compartimos alumno en edición por servicio común
      //con 2 -- compartimos alumno en edición por sessionStorage
      //con 3 -- compartimos alumno en edición via consulta al servidor

      this.alumno =  await this.recuperarAlumno(1, +idEdit!) 
      this.alumno = {...this.alumno}
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
