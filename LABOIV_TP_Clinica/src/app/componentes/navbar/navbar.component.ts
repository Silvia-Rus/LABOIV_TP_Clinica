import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logueado = this.auth.getAuth();
  // rol = '';

  constructor(private auth: AuthService, public st: StorageService) { }
  ngOnInit() {
    this.st.usuarioObj = new Usuario('', '', '', '', '', '', '', '', '');
    this.auth.getAuth().subscribe(res => {
      if(res != null)
      {
        this.st.getUser(res?.email);
      }
      })
  }

  logout() {
    this.auth.logout('/home');
  }
}
