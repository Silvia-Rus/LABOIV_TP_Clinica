import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(public st: StorageService) { }

  informe = -1;
  desde = '';
  hasta = '';
  listaTurnos: any;
  listaUsuarios: any;
  listaOk: any[] = [];

  data = {
    labels: [''],
    series: [[]]
  };

  ngOnInit() {
    this.traerListaTurnos();
    this.traerListaUsuarios();
  }

  //traer lista de turnos
  traerListaTurnos(){
    this.st.getCollection('turnos', 'esptaEmail')
            .subscribe((datos) => {this.listaTurnos = datos;})
  }
  //traer lista de usuarios
  traerListaUsuarios(){
    this.st.getCollection('usuarios', 'email')
            .subscribe((datos) => {this.listaUsuarios = datos;})
  }

  setInforme(informe: any){
    this.informe = informe;
  }

  BuscarPorLapso(desde: any, hasta: any, informe: any){
    this.desde = hasta;
    this.hasta = hasta;
    this.informe = informe;
  }

  turnosPorDia()
  {
  
      this.listaTurnos.forEach((turn: any )=> {
        this.listaOk.push(turn.diaSemana)});
      const result = this.listaOk.reduce((json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }), {});
      let daysWeek = Object.keys(result);
      this.data.labels = [];
      daysWeek.forEach(res => {
        this.data.labels.push(res);
      })
      console.log(this.data.labels);
      console.log(Object.values(result));
      this.data.series.push(Object.values(result));
      console.log(this.data.series);
  }

}
