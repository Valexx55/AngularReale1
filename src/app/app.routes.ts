import { Routes } from '@angular/router';
import { DniComponent } from './components/dni/dni.component';
import { ImcComponent } from './components/imc/imc.component';

//las rutas se mapean/asocian en este array

export const routes: Routes = [
    {path:'dni', component: DniComponent},
    {path:'imc', component: ImcComponent}
];
