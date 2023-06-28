import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.css']
})
export class CardsUsuariosComponent implements OnInit {

  constructor(public st: StorageService, public alerta: AlertService) { }

  @Input() listaItems: any;
  @Input() tipoUser: any;
  @Input() verificado: any;
  historia: any; //esto es lo que hay que enviar al componente
  verHistoria = false;
  listaHistorias: any;

  ngOnInit() {
    
  }
  verificarUsuario(usuario: any)
  {
    this.st.aprobarUser(usuario);
  }

  setVerHistoria(valor: any)
  {
      this.verHistoria = valor;
  }
  traerHistorias(email: any) {
    console.log(email);
    this.st.getCollection('historias', 'pacEmail')
            .subscribe((datos) =>{
              this.listaHistorias = datos;
              for(let h of this.listaHistorias){
                if(h.pacEmail == email)
                {
                  this.historia = h;
                  console.log(this.historia);
                  this.verHistoria = true;
                }
              }
              if(this.verHistoria == false){
                this.alerta.lanzarAlertaError("El paciente no tiene historia cargada");
              }
            })
  }



}
