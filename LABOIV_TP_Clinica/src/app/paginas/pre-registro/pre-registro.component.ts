import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.css']
})
export class PreRegistroComponent implements OnInit {

  @Output() rol = new EventEmitter<string>();

  constructor(private router: Router, private auth: AuthService, public st: StorageService) { }

  ensenar: boolean = true;

  ngOnInit() {
    this.st.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
    this.auth.getAuth().subscribe(res => {
      if(res != null){ this.st.getUser(res?.email); }
      })
  }

  registrarPaciente()
  {
    this.rol.emit('Paciente');    
  }

  registrarEspecialista()
  {
    this.rol.emit('Especialista');
  }

  registrarAdmin()
  {
    this.rol.emit('Admin');
  }
}
