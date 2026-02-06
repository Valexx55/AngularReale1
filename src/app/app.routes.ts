import { Routes } from '@angular/router';
import { DniComponent } from './components/dni/dni.component';
import { ImcComponent } from './components/imc/imc.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { JuegopptComponent } from './components/juegoppt/juegoppt.component';

//las rutas se mapean/asocian en este array

export const routes: Routes = [
    {path:'dni', component: DniComponent},
    {path:'imc', component: ImcComponent},
    {path:'alumnos', component: AlumnoComponent},
    {path:'alumno/form', component: FormularioAlumnoComponent},
    {path:'alumno/form/edit/:id', component: FormularioAlumnoComponent},
    {path:'juegoppt', component: JuegopptComponent}
];
