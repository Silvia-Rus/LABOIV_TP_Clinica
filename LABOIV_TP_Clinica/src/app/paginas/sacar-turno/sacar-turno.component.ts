import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  esp = '';
  espta = '';
  turno = '';
  constructor() { }

  ngOnInit() {
  }

  setEsp(esp: string)
  {
    this.esp = esp;
  }

  setTurnos(turno: string)
  {
    this.turno = turno;
  }

  setEspta(espta: any)
  {
    this.espta = espta;
  }

}
