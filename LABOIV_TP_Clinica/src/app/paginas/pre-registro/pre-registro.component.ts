import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.css']
})
export class PreRegistroComponent implements OnInit {

  @Output() rol = new EventEmitter<string>();

  constructor(private router: Router) { }

  ensenar: boolean = true;

  ngOnInit() {
    // this.ensenar = true;
  }

  registrarPaciente()
  {
    this.rol.emit('Paciente');    
  }

  registrarEspecialista()
  {
    this.rol.emit('Especialista');
  }
}
