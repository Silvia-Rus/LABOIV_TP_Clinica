import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { AlertService } from 'src/app/servicios/alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private alerta: AlertService, public st: StorageService, public router: Router, public auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let retorno = false;
      if(this.st.usuarioObj.rol === "Admin")
      {
        retorno = true;
      }
      if(!retorno)
      {
        this.alerta.lanzarAlertaError("no tienes acceso a esta página");
        this.router.navigate(['/home'])
      }
      console.log(this.st.usuarioObj);
      console.log(retorno);
      return retorno;
  }
  
}
