import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';

import { Router } from '@angular/router';
// import { Usuario } from 'src/app/clases/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  user: string = '';

  constructor(private auth: AuthService, private fb:FormBuilder, private st:StorageService){ 
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

  setUser(user: string){
    this.loginUsuario.value.email = user;
    this.loginUsuario.value.password  = '123456';
    this.login();
  }



}
