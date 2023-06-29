import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './paginas/home/home.component';
// import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { PreRegistroComponent } from './paginas/pre-registro/pre-registro.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { MiPerfilComponent } from './paginas/mi-perfil/mi-perfil.component';
import { SacarTurnoComponent } from './paginas/sacar-turno/sacar-turno.component';
import { CancelarTurnoComponent } from './paginas/cancelar-turno/cancelar-turno.component';
import { GestionTurnoEsptaComponent } from './paginas/gestion-turno-espta/gestion-turno-espta.component';
import { GestionTurnoPacComponent } from './paginas/gestion-turno-pac/gestion-turno-pac.component';
import { PacientesComponent } from './paginas/pacientes/pacientes.component';
import { HomeEsperaComponent } from './paginas/home-espera/home-espera.component';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home-espera', component: HomeEsperaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  { path: 'sacar-turno', component: SacarTurnoComponent },
  { path: 'cancelar-turno', component: CancelarTurnoComponent },
  { path: 'gestion-turno-espta', component: GestionTurnoEsptaComponent },
  { path: 'gestion-turno-pac', component: GestionTurnoPacComponent },
  { path: 'pacientes', component: PacientesComponent },

  // { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard]},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
