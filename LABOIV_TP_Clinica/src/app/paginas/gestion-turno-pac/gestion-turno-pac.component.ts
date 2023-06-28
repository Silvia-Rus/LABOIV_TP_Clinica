import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-gestion-turno-pac',
  templateUrl: './gestion-turno-pac.component.html',
  styleUrls: ['./gestion-turno-pac.component.css']
})
export class GestionTurnoPacComponent implements OnInit {

  constructor(private auth: AuthService, public st: StorageService) { }
  listaEspecialidades: any[] = [];
  listaTurnos: any;
  dniEsp: any;
  filtroEsp: any;


  ngOnInit() {
    this.auth.getAuth().subscribe(res => {
      if(res != null)
      { 
        console.log(res);
        if(this.listaEspecialidades.length == 0)
        {
          this.listaEspecialidades= [];
          this.traerEspecialidades(res.email);
          console.log(this.listaEspecialidades);
        }
      }
      });
      this.traerTurnos()
    
  }

  traerEspecialidades(email: any)
  {
    this.listaEspecialidades= [];
    console.log("llega aquí");
    this.st.getCollection('turnos', 'dia')
            .subscribe((datos) =>
              {
                this.listaTurnos = datos;
                for(let t of this.listaTurnos)
                {
                  let duplicado = false;
                  if(t.pacEmail == email)
                  {
                      for(let i of this.listaEspecialidades)
                      {
                        if(t.especialidad == i)
                        {
                          duplicado = true;
                        }
                      }
                    if(duplicado){break};
                    this.listaEspecialidades.push(t.especialidad);
                  }
                }
              })
  }

  traerTurnos()
  {
    this.st.getCollection('turnos', 'dia')
            .subscribe((datos) => {this.listaTurnos = datos;})
  }

  enviarFiltroDni(dni: any)
  {
    this.filtroEsp = '';
    this.dniEsp = dni;
  }

  enviarFiltroEsp(esp: any)
  {
    console.log(this.listaTurnos);
    this.filtroEsp = esp;
    this.dniEsp = '';
  }

  

}
