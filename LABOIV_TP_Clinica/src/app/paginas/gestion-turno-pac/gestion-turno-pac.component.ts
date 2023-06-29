import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { BusquedaService } from 'src/app/servicios/busqueda.service';


@Component({
  selector: 'app-gestion-turno-pac',
  templateUrl: './gestion-turno-pac.component.html',
  styleUrls: ['./gestion-turno-pac.component.css']
})
export class GestionTurnoPacComponent implements OnInit {

  constructor(private auth: AuthService, public st: StorageService, private busq: BusquedaService) { }
  listaEspecialidades: any[] = [];
  listaTurnos: any;
  dniEsp: any;
  filtroEsp: any;
  campo = '';
  valor = '';


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
    this.traerTurnos();
    this.filtroEsp = '';
    this.dniEsp = dni;
  }

  enviarFiltroEsp(esp: any)
  {
    this.traerTurnos();
    console.log(this.listaTurnos);
    this.filtroEsp = esp;
    this.dniEsp = '';
  }

  buscar(campo: any, valor: any) //se envía a la tabla listaTurnos
  {
    // this.traerTurnos();
    console.log(this.listaTurnos);
    this.listaTurnos = this.busq.buscar(campo, valor, this.listaTurnos);
    console.log(this.listaTurnos);
    // this.traerTurnos();
    // let listaBufer = [];
    // if(campo != '' || valor != '')
    // {
    //   for(let i of this.listaTurnos)
    //   {
    //     console.log(this.listaTurnos[0]["esptaEmail"]);
    //     console.log(this.listaTurnos[0][campo]);
    //     var valorBufer = this.listaTurnos[0][campo];

    //     if(valorBufer == valor)
    //     {
    //       listaBufer.push(i);
    //     }
    //   }
    //   this.listaTurnos = listaBufer;
    // }
    // console.log(listaBufer);
    // console.log(this.listaTurnos);
  }

  

}
