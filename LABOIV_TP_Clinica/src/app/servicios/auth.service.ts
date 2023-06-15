import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { AlertService } from './alert.service';
import { Auth } from '@angular/fire/auth';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { Usuario } from 'src/app/clases/usuario';
import { getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, 
              private router: Router,
              // private readonly auth: Auth,
              private st: StorageService,
              private alerta: AlertService
              ) { }

  login(email: string, password: string)
  {
    this.afauth.signInWithEmailAndPassword(email, password)
    .then((user)=> {
        firebase.firestore().collection('usuarios').where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.data()["verificado"] == 'true'){
              if(user.user?.emailVerified == true){
                this.alerta.lanzarAlertaExito("¡Bienvenido "+doc.data()["nombre"]+"!");
                this.router.navigate(['/home']);
              }
              else{
                this.alerta.lanzarAlertaError("Confirme primero su mail.");
                this.logout("/login");
              }
            }
            else{
              this.alerta.lanzarAlertaError("Espere a que un admin apruebe su usuario.");
              this.logout("/login");
            }
            console.log(doc.data());
          });
        })
        .catch((error) => {
          console.log('Error buscando: ', error);
        });
    }).catch((error) => {
      this.alerta.lanzarAlertaError(this.error(error.code));        
      });
  }

 async registro(usuario: Usuario, archivos: any)
  {
    console.log(archivos);
    this.afauth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((res) => {
        res.user?.sendEmailVerification();
        this.alerta.lanzarAlertaExito("Pronto recibirá un mail para confirmar su mail.")
        this.st.subirImagenes(usuario.email, archivos);
        this.st.addUsuario(usuario, archivos);
      })
      .catch((error) => {
        this.alerta.lanzarAlertaError(this.error(error.code));        
      })
  }
  async updateUser(name: string, url: string) {
    let auth = getAuth();
    return await updateProfile(auth.currentUser!, { displayName: name, photoURL: url }).then().catch(
      (err) => console.log(err));
  }
  error(error:string)
  {
    switch(error){
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return "Datos incorrectos.";
       break;
    case 'auth/email-already-in-use':  
      return "El mail ya está en uso.";
        break;  
    default:
      return "Error desconocido";
       break;
    }
  }

 logout(redireccion: string) {
    this.afauth.signOut()
    .then((user)=> {
      console.log("¡Adios!");
      // this.alerta.lanzarAlertaExito('¡Chau!');
      this.router.navigate([redireccion]);
    }).catch((error) => {
        this.alerta.lanzarAlertaError(':( '+this.error(error.code));        
      });
  }

  getAuth() {
    return this.afauth.authState;
  }

  async printCurrentUser() {
    this.getAuth().subscribe(res => {
    //this.afauth.authState.subscribe(res => {
      console.log(res);
    })
    
  }

  // currentUserEmail(){
  //   this.getAuth().subscribe((user) => {
  //     console.log(user);
  //     if(user)
  //     {
  //       return user.email;
  //     }
  //     else
  //     {
  //       return null;
  //     }
  //   });
  // }



}




