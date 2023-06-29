import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

constructor() { }

buscar(campo: any, valor: any, lista: any) //se envía a la tabla listaTurnos
{
  let listaBufer = [];
  let listaBuferDos = lista;
  console.log(lista);
  console.log(lista[0][campo]);
  if(campo != '' || valor != '')
  {
    
    console.log("llega?");
    for(let i of lista)
    {

      var valorBufer = i[campo];
      console.log(valorBufer);
      if(valorBufer == valor)
      {
        listaBufer.push(i);
      }
    }
    return listaBufer;
  }
  return lista;
  console.log(listaBufer);
  console.log(lista);
}
}
