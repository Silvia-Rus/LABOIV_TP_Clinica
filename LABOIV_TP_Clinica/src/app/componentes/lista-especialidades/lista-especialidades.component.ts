import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css']
})
export class ListaEspecialidadesComponent implements OnInit {

  listaItems: any;
  @Output() esp = new EventEmitter<string>();
  constructor(public auth: AuthService, public st: StorageService) { }

  ngOnInit() {
    this.traerListaActualizada()
  }

  traerListaActualizada() {
    this.st.getCollection('especialidades', 'nombre')
            .subscribe(datos =>this.listaItems = datos)
  }


  enviarEspecialidad(esp: string)
  {
    // <app-lista-especialidades (esp)="setEsp($event)"></app-lista-especialidades>

    this.esp.emit(esp);    
  }

}
