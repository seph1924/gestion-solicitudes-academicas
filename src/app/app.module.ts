import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudes.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import { EstudiantesApiComponent } from './components/estudiantes-api/estudiantes-api.component';
import { FiltroSolicitudesComponent } from './components/filtro-solicitudes/filtro-solicitudes.component';

// Arquitectura tradicional de modulos (no standalone):
// todos los componentes se declaran aqui.

@NgModule({

  declarations: [

    AppComponent,

    NavbarComponent,

    ListaSolicitudesComponent,

    SolicitudFormComponent,

    EstudiantesApiComponent,

    FiltroSolicitudesComponent

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    FormsModule,

    ReactiveFormsModule, // Actividad 3: formularios reactivos

    HttpClientModule // Actividad 4: peticiones HTTP

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }