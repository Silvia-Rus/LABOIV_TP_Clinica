import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { Dia } from 'src/app/clases/dia';
import { reference } from '@popperjs/core';
import { AnimateTimings } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/es';
import { Turno } from 'src/app/clases/turno';

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
  listaHoras: any[] = [];

  //ENVIAR
  listaTurnosEsp: any[] = [];

  //MOSTRAR
  listaEsptas: any[] = [];
  listaMailsEspecialistas: any[] = [];

  constructor(public auth: AuthService, public st: StorageService) { }

  ngOnInit() {
    this.traerListaUsuarios();
    this.traerListaHorarios();
    // this.traerListaTurnos();
    // this.test();
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
    for(let i = 0; i < 15; i++)
    {
      var maniana = moment().add(1, 'days');  //día de la semana en número
      var diaAGrabar = maniana.add(i, 'days');
      var diaObj = new Dia(diaAGrabar.format('dddd'), diaAGrabar.format('DD-MM-YYYY'));
      this.listaDias.push(diaObj);
    }
  }

  horas(horaDesde: any, horaHasta: any)
  {
      this.listaHoras = [];
      var horaDesdeMom = moment(horaDesde, 'HH:mm');
      var horaHastaMom = moment(horaHasta, 'HH:mm');
      var horaAGrabar = horaDesdeMom;
      this.listaHoras.push(horaDesdeMom.format('HH:mm'));

      do
      {
        horaAGrabar = horaDesdeMom.add(30, 'minutes');
        this.listaHoras.push(horaAGrabar.format('HH:mm')); 
      }while(horaAGrabar < horaHastaMom);
  }

  horariosEspta(espta: string)
  {
    for(let h of this.listaHorarios)
    {
      if(h.email == espta && h.horaDesde != '')
      {
        this.listaHorariosEsp.push(h);
      }
    }
  }

  generadorTurnos(espta: any) //tiene que recibir todo el espta
  {
    this.dias(); //esto camina
    this.horariosEspta(espta.email);
    console.log(this.listaDias);
    console.log(this.listaHorariosEsp); //miércoles de 15:00 a 18:00
    //rodar el array de horarios 
    for(let h of this.listaHorariosEsp) //solo hay uno
    {
      console.log('veces en listaHorarios esp debe ser solo 1');
      for(let d of this.listaDias)
      {
        if(d.diaSemana == h.diaSemana)
        {
          console.log(d);
          this.horas(h.horaDesde, h.horaHasta);

          for(var hora of this.listaHoras)
          {
            //AQUÍ SE CREA EL OBJETO TURNO
            var turno = new Turno(espta.nombre, espta.email, this.especialidad, d.fecha, hora);
            //AQUÍ SE DEBE VALIDAR SI YA EXISTE
            
            //AQUÍ SE AÑADE A LA LISTA QUE SALE POR OUTPUT
            this.listaTurnosEsp.push(turno);
          }
        }
      }
    }
    console.log(this.listaTurnosEsp);
  }

  test(){
    
  //  this.horas('9:30', '10:30'); //9:30 - 10:00
  }
}
