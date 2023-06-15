import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logueado = this.auth.getAuth();
  
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout('/home');
  }
}
