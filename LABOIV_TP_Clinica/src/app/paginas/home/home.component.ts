import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router) { }
  logueado = this.auth.getAuth();
  ngOnInit() {
  }

 acceso(){
    this.auth.getAuth().subscribe(user => {
      user?.email ? this.router.navigate(['/home-juegos']) : this.router.navigate(['/login'])
    });
  }
}
