import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Horario } from 'src/app/clases/horario';
import { AlertService } from 'src/app/servicios/alert.service';
// import { HorariosEsptaPipe } from 'src/app/pipes/horarios-espta.pipe';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  horaDesde = '';
  horaHasta = '';
  dia = '';
  listaItems: any;
  constructor(public st: StorageService, public auth: AuthService, public alerta: AlertService) { }

  ngOnInit() {  
    this.auth.getAuth().subscribe(res => {
      if(res != null)
      { 
        this.st.getImages(res?.email);
      }
      })
      this.traerListaActualizada();
  }

  elegirDia(dia: any){
    this.dia = dia;
  }

  horaDesdeEsMenorAHoraHasta()
  {
    var retorno = null;

    //this.horaDesde == '' || this.horaHasta == '' && 
    console.log(this.horaDesde < this.horaHasta );
    this.horaDesde != '' && (this.horaDesde < this.horaHasta)  ? retorno = true : retorno = false;
    return retorno;
  }
  
  grabarDia(dia: any)
  {
    if(this.horaDesdeEsMenorAHoraHasta())
    {
      var clave = this.st.usuarioObj.email+"_"+dia;
      var horario = new Horario(this.st.usuarioObj.nombre, 
                                this.st.usuarioObj.email, 
                                clave, 
                                dia,
                                this.horaDesde, 
                                this.horaHasta)
      this.st.addHorarioConValidacion(horario).
              then(()=> this.alerta.lanzarAlertaExito("Horario añadido/modificado con éxito"));
      this.ngOnInit();
    }
    else
    {
      this.alerta.lanzarAlertaError("La hora desde que empieza el horario debe ser menor a la que termina");
    }
  }

  traerListaActualizada() {
    this.st.getCollection('horarios', 'diaSemana')
            .subscribe(datos =>this.listaItems = datos)
  }

  reset(){
    this.horaDesde = '';
    this.horaHasta = '';
  }
}
