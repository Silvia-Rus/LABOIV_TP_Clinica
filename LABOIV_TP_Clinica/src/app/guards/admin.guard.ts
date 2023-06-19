import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, public st: StorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let retorno = false;
      if(this.st.usuarioObj.rol === "Admin")
      {
        retorno = true;
      }
      console.log(retorno);
      return retorno;
  }
  
}
