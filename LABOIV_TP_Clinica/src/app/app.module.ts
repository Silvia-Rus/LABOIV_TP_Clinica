import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule  } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { AppComponent } from './app.component';
//componentes
import { NavbarComponent } from './componentes/navbar/navbar.component';
//páginas
import { HomeComponent } from './paginas/home/home.component';
import { RegistroComponent } from './paginas/registro/registro.component';

import { StorageService } from './servicios/storage.service';
import { AuthService } from './servicios/auth.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { LoginComponent } from './paginas/login/login.component';
import { PreRegistroComponent } from './paginas/pre-registro/pre-registro.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { MiPerfilComponent } from './paginas/mi-perfil/mi-perfil.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SacarTurnoComponent } from './paginas/sacar-turno/sacar-turno.component';
import { ListaEspecialidadesComponent } from './componentes/lista-especialidades/lista-especialidades.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaTurnosComponent } from './componentes/lista-turnos/lista-turnos.component';
import { HorariosEsptaPipe } from './pipes/horarios-espta.pipe';
import { FechaHoraTurnoPipe } from './pipes/fechahora-turno.pipe';

const firebaseConfig = {
  apiKey: "AIzaSyAsMi9zxscXsbA_0befCml62yl9e8qoHlg",
  authDomain: "clinicadrarus.firebaseapp.com",
  projectId: "clinicadrarus",
  storageBucket: "clinicadrarus.appspot.com",
  messagingSenderId: "164326829085",
  appId: "1:164326829085:web:78e691eaa23ed03e6daaf4"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistroComponent,
    PreRegistroComponent,
    ListaUsuariosComponent,
    UsuariosComponent,
    MiPerfilComponent,
    SacarTurnoComponent,
    ListaEspecialidadesComponent,
    ListaEspecialistasComponent,
    ListaTurnosComponent,
    HorariosEsptaPipe,
    FechaHoraTurnoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(()=>getStorage()),
    BrowserAnimationsModule,
    UpperCasePipe

    // AngularFireStorageModule, provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
    // AngularFirestoreModule.enablePersistence(),
  ],
  providers: [StorageService, UpperCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
