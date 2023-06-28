import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-gestion-turno-espta',
  templateUrl: './gestion-turno-espta.component.html',
  styleUrls: ['./gestion-turno-espta.component.css']
})
export class GestionTurnoEsptaComponent implements OnInit {

  usuario:  any;
  listaUsuarios: any;
  listaTurnos: any;
  filtroEsp: any;
  listaEspecialidades: any[] = [];
  listaHistorias: any;
  dniPac: any;
  historia = false;
  turno: any;

  constructor(private auth: AuthService, public st: StorageService) { }

  ngOnInit() {
    // this.listaEspecialidades= [];
    this.auth.getAuth().subscribe(res => {
      if(res != null)
      { 
        if(this.listaEspecialidades.length == 0)
        {
          this.listaEspecialidades= [];
          this.traerEspecialidades(res.email);
          console.log(this.listaEspecialidades);
        }
        this.traerTurnos();
      }
      });
      console.log(this.listaEspecialidades);
      this.traerHistorias();
  }

  setHist(historia: boolean){
    this.historia = historia;
  }

  setTurno(turno: Turno){
    this.turno = turno;
    // this.turno = this.listaTurnos[0];
  }

  traerEspecialidades(email: any)
  {
    this.listaEspecialidades= [];
    this.st.getCollection('usuarios', 'nombre')
            .subscribe((datos) =>
              {
                this.listaUsuarios = datos;

                for(let i of this.listaUsuarios)
                {
                  if(i.email == email)
                  {
                    for(let e of i.especialidad)
                    {
                      this.listaEspecialidades.push(e);
                    }
                  }
                }
              })
  }

  traerTurnos()
  {
    this.st.getCollection('turnos', 'dia')
            .subscribe((datos) => {this.listaTurnos = datos;})
  }

  traerHistorias()
  {
    this.st.getCollection('historias', 'pacDni')
            .subscribe((datos) => {this.listaHistorias = datos;})
  }

  enviarFiltroEsp(esp: any)
  {
    this.filtroEsp = esp;
    this.dniPac = '';
  }

  enviarFiltroDni(dni: any)
  {
    this.filtroEsp = '';
    this.dniPac = dni;
  }

}
