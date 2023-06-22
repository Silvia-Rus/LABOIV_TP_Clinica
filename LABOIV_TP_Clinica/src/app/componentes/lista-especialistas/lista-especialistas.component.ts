import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { reference } from '@popperjs/core';
import { AnimateTimings } from '@angular/animations';
import * as moment from 'moment';


@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent implements OnInit {

  @Output() espta = new EventEmitter<string>();
  @Output() turnos = new EventEmitter<any[]>();

  @Input() especialidad: any;

  //TRAER
  listaItems: any;
  listaHorarios: any;
  listaTurnos: any;
  listaDias: any[] = [];

  //AUX
  listaHorariosEsp: any[] = [];

  //ENVIAR
  listaTurnosEsp: any[] = [];

  //MOSTRAR
  listaEsptas: any[] = [];
  listaMailsEspecialistas: any[] = [];

  constructor(public auth: AuthService, public st: StorageService) { }

  ngOnInit() {
    this.traerListaUsuarios();
    this.traerListaHorarios();
    this.traerListaTurnos();
    this.dias();
    console.log(this.listaHorarios);
  }

  traerListaHorarios(){
    this.st.getCollection('horarios', 'diaSemana')
            .subscribe(datos =>this.listaHorarios = datos)

  }

  traerListaTurnos(){
    this.st.getCollection('turnos', 'emailEspecialista')
            .subscribe(datos =>this.listaHorarios = datos)

  }

  traerListaUsuarios() {
    this.st.getCollection('usuarios', 'nombre')
            .subscribe((datos) =>
              {
                this.listaItems = datos;
                for(let i = 0; i < this.listaItems.length; i++)
                {
                  if(this.listaItems[i].rol == 'Especialista')
                  {
                    this.listaEsptas.push(this.listaItems[i]);
                  }
                }
                for(let i = 0; i < this.listaEsptas.length; i++)
                {
                   this.listaMailsEspecialistas.push(this.listaEsptas[i].email)
                }
                this.st.getImagenes(this.listaMailsEspecialistas);
                // console.log(this.st.listaUrlParaVarios);
                // console.log(this.listaItemsEspecialistas);
              })
  }

  enviarEspecialista(espta: string)
  {
    this.espta.emit(espta);    
  }

  enviarTurnos(espta: string) //tiene que llegar un email
  {
    this.generadorTurnos(espta);
    this.turnos.emit(this.listaTurnosEsp)
  }

  dias()
  {
    // this.listaDias.push -- OBJETO DÍA?

  }

  horariosEspta(espta: string)
  {
    for(let h of this.listaHorarios)
    {
      if(h.email == espta)
      {
        this.listaHorariosEsp.push(h);
      }
    }
  }

  generadorTurnos(espta: string) //tiene que enviar un email
  {
    this.horariosEspta(espta);
    //rodar el array de horarios 
    for(let h of this.listaHorariosEsp)
    {
      for(let d of this.listaDias)
      {
        if(d == h.diaSemana)
        {
          //generar los turnos (objeto de una clase) de 30 en 30 (horaDesde - horaHasta)
          //validación contra la lista turnos
        }
      }
    }
  }

  test(){
   console.log(this.listaHorarios);
  }
}
