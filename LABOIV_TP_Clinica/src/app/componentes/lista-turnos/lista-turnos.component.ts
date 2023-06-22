import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {

  constructor(public auth: AuthService, public st: StorageService) { }
  @Input() especialista: any;


  listaHorarios: any;
  listaEspecialistas: any;
  diasSemanaEsp: any[] = [];
  
  ngOnInit() {
    this.traerHorarios();
  }

  traerHorarios() {
    this.st.getCollection('usuarios', 'nombre')
            .subscribe((datos) => {
              this.listaHorarios = datos;
              for(let item of this.listaHorarios)
              {
                if(item.email = this.especialista)
                {
                  this.diasSemanaEsp.push(item.diaSemana);
                }
              }
              console.log(this.diasSemanaEsp);
            })
  }

}
