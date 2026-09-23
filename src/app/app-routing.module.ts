import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudiantesApiComponent } from './components/estudiantes-api/estudiantes-api.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudes.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';

import { FiltroSolicitudesComponent } from './components/filtro-solicitudes/filtro-solicitudes.component';
// Actividad 3: rutas configuradas con RouterModule.
// Los nombres coinciden con los enlaces del NavbarComponent.
const routes: Routes = [
  { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  { path: 'solicitudes', component: ListaSolicitudesComponent },
  { path: 'nueva-solicitud', component: SolicitudFormComponent },
  { path: 'estudiantes-api', component: EstudiantesApiComponent },
  { path: 'filtro-solicitudes', component: FiltroSolicitudesComponent },
  { path: '**', redirectTo: 'solicitudes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
