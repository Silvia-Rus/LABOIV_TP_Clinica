import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';

import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  archivos: FileList[] = [];
  // archivos: any;
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private db: AuthService,
              private st: StorageService
              // public storage: StorageService
              ) { }

  ngOnInit() : void {
    this.form = this.fb.group({
      rol: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      nombre: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      edad: ['', [Validators.max(100)]],
      dni: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      obraSocial: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      especialidad: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      imagenUno: ['', [Validators.required]],
      imagenDos: ['', [Validators.required]]
    })
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

 cargarImagen($event: any) {
    // this.archivos = $event.target.files;
     const archivo = $event.target.files;
     console.log(archivo);
     this.archivos.push(archivo);
     console.log(this.archivos);
}

subirImagenes(usuario: string)
{
  for (let index = 0; index < this.archivos.length; index++){
    console.log(this.archivos[index]);
    this.st.subirImagen(usuario, this.archivos[index]);
  }
}

crearUsuario(){

    console.log("archivos al grabar "+this.archivos);

    const rol = this.form.value.rol;
    const usuario = new Usuario(this.form.value.nombre,
                                  this.form.value.apellido,
                                  this.form.value.dni, 
                                  this.form.value.edad,
                                  this.form.value.email, 
                                  this.form.value.password, 
                                  this.form.value.rol,
                                  this.form.value.obraSocial, 
                                  this.form.value.especialidad);
    //grabar en base
    console.log(this.archivos);

    // this.st.subirImagenes(usuario.email, this.archivos);
    //this.st.subirImagen(usuario.email, this.archivos);
    this.db.registro(usuario, this.archivos);
    console.log(this.archivos);
    //resetear
    this.reset();
  }
}
