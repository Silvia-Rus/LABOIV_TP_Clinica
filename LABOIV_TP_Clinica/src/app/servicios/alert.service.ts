import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() {
 }

 lanzarAlerta(icono: any, texto: String)
 {
   Swal.fire({
     icon: icono, //success, error, warning, info, question
     title: texto,
     showConfirmButton: false,
     timer: 1500
   })
 }

 lanzarMensajeTurnos(to: any)
 {
   let html = '<br><b>'+to[0].pacNombre+' '+to[0].pacApellido+'</b><br>';
   for(let i = 0 ; i < to.length; i++)
   {
    console.log("entra?");
    let cadena = '<br>'+to[i].dia+' '+to[i].hora+'<br>';
    console.log(cadena);
    html = html.concat(cadena);
   }

   console.log(html)

   Swal.fire({
     title: 'Últimos turnos',
     text: to[0].pacNombre+to[0].pacApellido,
     html: html,
     showConfirmButton: true,
     confirmButtonColor: '#198754',
   })
 }

 lanzarAlertaExito(texto: String)
 {
  this.lanzarAlerta('success', texto);
 }


 lanzarAlertaError(texto: String)
 {
  this.lanzarAlerta('error', texto);
 }
}
