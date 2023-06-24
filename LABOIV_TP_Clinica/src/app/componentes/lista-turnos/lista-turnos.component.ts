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
  }

  //la validación de si es admin o paciente

  //grabarlo en la BD



}
