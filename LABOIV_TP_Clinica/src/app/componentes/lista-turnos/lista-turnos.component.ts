import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {

  constructor(public auth: AuthService, public st: StorageService) { }
  @Input() turnos: Turno[] = [];
  
  ngOnInit() {
    
  }

  pedirTurno(turno: Turno){

    var usuario = this.st.usuarioObj;
    //nombre pacie
    if(usuario.rol == "Paciente")
    {
      //lanzar modal ta seguro etc.
      //Grabar
      
      turno.turnoMasPaciente(turno, usuario.nombre, usuario.apellido, usuario.email);
      this.st.addTurno(turno);
    
    }
    else
    {
      //lanzarModal
    }

    console.log(this.turnos[0]);

  }

}
