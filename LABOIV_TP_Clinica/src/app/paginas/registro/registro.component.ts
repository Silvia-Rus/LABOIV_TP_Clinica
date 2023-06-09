import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { CaptchaService } from 'src/app/servicios/captcha.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  archivos: FileList[] = [];
  form!: FormGroup;
  rol: string = ''; 
  esAdmin = false;
  especialidades: string[] = [];

  constructor(private readonly fb: FormBuilder,
              private db: AuthService,
              private st: StorageService,
              public c: CaptchaService,
              private router: Router

              ) { }

  ngOnInit() : void {
    this.form = this.fb.group({
      rol: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      nombre: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      edad: ['', [Validators.required, Validators.max(100)]],
      dni: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      obraSocial: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      especialidad: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      gastroenterologia: [''],
      ginecologia: [''],
      clinica: [''],
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

  setRol(rol: string)
  {
    this.rol = rol;
  }

  setEsAdmin(esAdmin: any)
  {
    this.esAdmin = esAdmin;
  }

  atras()
  {
    this.rol = '';
  }

  cargarImagen($event: any) {
     const archivo = $event.target.files;
     this.archivos.push(archivo);
  }

  subirImagenes(usuario: string)
  {
    for (let index = 0; index < this.archivos.length; index++){
      console.log(this.archivos[index]);
      this.st.subirImagen(usuario, this.archivos[index]);
    }
  } 

  cargarEspecialidades()
  {
    if(this.form.value.gastroenterologia){this.especialidades.push("Gastroenterología");}
    if(this.form.value.ginecologia)      {this.especialidades.push('Ginecología');}
    if(this.form.value.clinica)          {this.especialidades.push('Clinica');}
    if(this.form.value.especialidad)     {this.especialidades.push(this.form.value.especialidad);
                                          this.st.addEspecialidad(this.form.value.especialidad);}
  }

  crearUsuario(){
    this.c.captcha().then(res=> {
      if(res){
        this.cargarEspecialidades();
        const usuario = new Usuario(this.form.value.nombre,
                                      this.form.value.apellido,
                                      this.form.value.dni, 
                                      this.form.value.edad,
                                      this.form.value.email, 
                                      this.form.value.password, 
                                      this.rol,
                                      this.form.value.obraSocial, 
                                      this.especialidades);
        this.db.registro(usuario, this.archivos).then(()=>{
          if(this.esAdmin)
          {
            this.router.navigate(['/home']);
          }
          else
          {
            this.router.navigate(['/home-espera']);
          }

        });
      }
    })
  }
}
