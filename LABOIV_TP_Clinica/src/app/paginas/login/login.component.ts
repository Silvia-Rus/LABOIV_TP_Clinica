import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
// import { Usuario } from 'src/app/clases/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;

  constructor(private auth: AuthService,
              private fb:FormBuilder,
              ) { 
                this.loginUsuario = this.fb.group({ 
                  email:['', Validators.required],
                  password:['', Validators.required],
                  })
                }
  ngOnInit() {
  }

  login () {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password; 
    this.auth.login(email, password);
  }

  accesoAdmin(): void {
    this.loginUsuario.value.email = 'admin@clinica.com';
    this.loginUsuario.value.password  = '123456';
  }

  accesoEmpleado(): void {
    this.loginUsuario.value.email = 'empleado@clinica.com';
    this.loginUsuario.value.password  = '123456';
  }

}
