import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';




@Component({
  selector: 'app-gestion-turno-espta',
  templateUrl: './gestion-turno-espta.component.html',
  styleUrls: ['./gestion-turno-espta.component.css']
})
export class GestionTurnoEsptaComponent implements OnInit {

  // @Output() turnos = new EventEmitter<any>();

  usuario:  any;
  listaUsuarios: any;
  listaTurnos: any;
  filtroEsp: any;
  listaEspecialidades: any[] = [];
  mailPac: any;

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

  enviarFiltroEsp(esp: any)
  {
    this.filtroEsp = esp;
    this.mailPac = '';
  }

  enviarFiltroMail(mail: any)
  {
    this.filtroEsp = '';
    this.mailPac = mail;
  }

}
