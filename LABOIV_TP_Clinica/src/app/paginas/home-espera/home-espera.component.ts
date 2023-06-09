import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-home-espera',
  templateUrl: './home-espera.component.html',
  styleUrls: ['./home-espera.component.css']
})
export class HomeEsperaComponent implements OnInit {


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  salir()
  {
    this.auth.logout('/home');
  }

}
