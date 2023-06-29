import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/servicios/storage.service';
import { AlertService } from 'src/app/servicios/alert.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EspecialistaGuard implements CanActivate {
  constructor(private alerta: AlertService, public st: StorageService, public router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let retorno = false;
      console.log(this.st.usuarioObj.rol);
      if(this.st.usuarioObj.rol === "Especialista" || this.st.usuarioObj.rol === "Admin" )
      {
        retorno = true;
      }
      if(!retorno)
      {
        this.alerta.lanzarAlertaError("No tienes acceso a esta página");
        this.router.navigate(['/home'])
      }
      console.log(retorno);
      return retorno;
  }
  
}
