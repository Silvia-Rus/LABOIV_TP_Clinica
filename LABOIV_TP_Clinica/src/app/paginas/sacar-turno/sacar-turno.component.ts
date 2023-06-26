import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  esp = '';
  espta = '';
  turno: Turno[] = [];
  constructor() { }

  ngOnInit() {
  }

  setEsp(esp: string)
  {
    this.esp = esp;
  }

  setEspta(espta: any)
  {
    console.log(espta);
    this.espta = espta;
    console.log(this.espta);

  }

  setTurnos(turnos: any)
  {
    this.turno = turnos;
  }

}
