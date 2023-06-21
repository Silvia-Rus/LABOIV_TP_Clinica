import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(public st: StorageService) { }

  @Input() listaItems: any;
  @Input() tipoUser: any;
  @Input() verificado: any;

  ngOnInit() {
  }

  verificarUsuario(usuario: any)
  {
    this.st.aprobarUser(usuario);
  }


}
