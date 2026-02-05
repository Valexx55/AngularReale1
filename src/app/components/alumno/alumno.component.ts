import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { Observer, take } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrashSolid } from '@ng-icons/heroicons/solid';
import { bootstrapPencilFill } from '@ng-icons/bootstrap-icons';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AlumnosActions from '../../alumnos/store/alumnos.actions';

@Component({
  selector: 'app-alumno',
  imports: [DatePipe, NgIcon, RouterLink, AsyncPipe],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
  providers: [
    provideIcons({
      heroTrashSolid,
      bootstrapPencilFill,
    }),
  ],
})
export class AlumnoComponent implements OnInit {

  lista_alumnos!: Array<Alumno>;
  observerAlumnos!: Observer<Alumno>;
  //inyección, igual que por el parámetro del consucutor
  store = inject(Store); //obtengo la instancia del store (memoria de Redux)

  //alumnosRedux representa una lsita actualizada del store en tiempo real
  //accedemos a la información centralizada en tiempo real
  alumnosRedux$ = this.store.select((state) => state.alumnos.list);
  //hay una convecnión con las variables reactivas, que es ponerle un $ al final
  //Observable , va con $
  loading$ = this.store.select((state) => state.alumnos.loading);

  constructor(
    public alumnoService: AlumnoService,
    private router: Router,
  ) {
  }

@HostListener('window:beforeunload', ['$event'])
avisoRecarga(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = '';
}



   getAlumnosFromService ()
  {
    this.alumnoService.leerTodosLosAlumnos().subscribe(
      {
        complete: () => {console.log("comunicaión completada");},
        error: (error_rx) => {console.error(error_rx);},
        next: (alumnos) => {
          //quiero mostrar los ids de los alumnos rx
          alumnos.forEach( alumno => {console.log(alumno.id);})
          this.lista_alumnos = alumnos;
          this.store.dispatch(AlumnosActions.loadAlumnosSuccess({ alumnos }));
        }
      }
    );
  }

  ngOnInit(): void {
    //si la lista esta vacía, cargo el remoto de service
    //si no, tiro de local
    this.alumnosRedux$.pipe(take(1)).subscribe((alumnos) => {

      if (alumnos.length === 0) {
            this.store.dispatch(AlumnosActions.loadAlumnos());
            this.getAlumnosFromService()
      }
    });
  }

  borrarAlumno(id: number) {
    console.log('Ha tocado borrar el ' + id);
    if (confirm(`¿Deseas eliminar al alumno ${id}`)) {
      this.alumnoService.borrarAlumnoPorId(id).subscribe({
        complete: () => console.log('Comunicación terminada'),
        next: () => {
          console.log('Alumno borrado');
          //TODO: borrar al alumno del listado
        /*  this.lista_alumnos = this.lista_alumnos.filter(
            (a) => a.id != id,
          );*/
          this.store.dispatch(AlumnosActions.deleteAlumnosSuccess({id}))
        },
        error: (errror_rx) => console.error(errror_rx),
      });
    } else {
      console.log('Cancela borrado');
    }
  }

    /*
OPCIONES PARA COMPARTIR INFO ENTRE C'S

1) VÍA SERIVICIO COMÚN V
2) VÍA MEMORIA NAVEGADOR SESSIONSTORAGE X
3) PETICIÓN AL SERVIDOR VÍA PARÁMETRO ID X


*/
  editarAlumno(alumno: Alumno) {
    console.log('Ha tocado editar el ' + alumno.id);
    //OPCIÓN 1)
    this.alumnoService.guardarAlumnnoEnEdicion(alumno)
    //OPCIÓN 2)
    //sessionStorage.setItem("alumnoed", JSON.stringify(alumno))
    //this.router.navigate(["/alumno/form/edit", alumno.id])
    //////OPCIÓN 3)
    this.router.navigate(['/alumno/form/edit', alumno.id]);
  }

}
