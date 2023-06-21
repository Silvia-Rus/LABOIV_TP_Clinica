import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { reference } from '@popperjs/core';



@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent implements OnInit {

  @Output() espta = new EventEmitter<string>();
  @Input() especialidad: any;

  listaItems: any;
  listaItemsEspecialistas: any[] = [];
  listaMailsEspecialistas: any[] = [];

  constructor(public auth: AuthService, public st: StorageService) { }

  ngOnInit() {
    this.traerListaActualizada();
  }

  traerListaActualizada() {
    this.st.getCollection('usuarios', 'nombre')
            .subscribe((datos) =>
              {
                this.listaItems = datos;
                for(let i = 0; i < this.listaItems.length; i++)
                {
                  if(this.listaItems[i].rol == 'Especialista')
                  {
                    this.listaItemsEspecialistas.push(this.listaItems[i]);
                  }
                }

                for(let i = 0; i < this.listaItemsEspecialistas.length; i++)
                {
                   this.listaMailsEspecialistas.push(this.listaItemsEspecialistas[i].email)
                }
                this.st.getImagenes(this.listaMailsEspecialistas);
                console.log(this.st.listaUrlParaVarios);
                console.log(this.listaItemsEspecialistas);
              })
  }

  enviarEspecialista(espta: string)
  {
    this.espta.emit(espta);    
  }

}
