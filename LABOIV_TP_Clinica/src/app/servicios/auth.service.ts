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
      this.router.navigate(['/home']);
      this.alerta.lanzarAlertaExito('¡Holi '+user.user?.email+'!');
      // this.storage.grabarLog(email);
      // console.log(this.storage.getNombre(email))
    }).catch((error) => {
      this.alerta.lanzarAlertaError(this.error(error.code));        
      });
  }

 registro(usuario: Usuario, archivos: any)
  {
    console.log(archivos);
    //this.st.subirImagenes(usuario.email, archivos);
    this.afauth.createUserWithEmailAndPassword(usuario.email, usuario.password)
    .then((res) => {
      // console.log(res);
      // console.log(res.user);
      // console.log(archivos)
      //enviar mail de verificación
      // res.user?.sendEmailVerification();
      // .then(async () => {
      //   // await this.st.getImages(usuario.email).then(() => {
      //   //   this.updateUser(usuario.nombre, this.st.listUrl[0]);
      //   //   //guardar
      //   //   usuario.photoUrl = this.st.listUrl[0];
      //   //   usuario.imageUrl = [...this.st.listUrl];
      //   //   console.log(usuario.photoUrl);
      //   //   this.st.addUsuario(usuario)
      //   // })
      //   console.log("acáaaaa");
      // })
      //alerta de esperar que llegue el mail de verificación
      // this.st.addUsuario(usuario)
      this.alerta.lanzarAlertaExito("Pronto recibirá un mail para confirmar su mail.")
      //signout
    }).catch((error) => {
      this.alerta.lanzarAlertaError(this.error(error.code));        
      });

  

      this.st.subirImagenes(usuario.email, archivos).then(async () => {
        // await this.st.getImages(usuario.email).then(() => {
        //   this.updateUser(usuario.nombre, this.st.listUrl[0]);
        //   //guardar
        //   usuario.photoUrl = this.st.listUrl[0];
        //   usuario.imageUrl = [...this.st.listUrl];
        //   console.log(usuario.photoUrl);
        //   this.st.addUsuario(usuario)
        // })
        console.log("acáaaaa");
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

  async logout() {
    this.afauth.signOut()
    .then((user)=> {
      this.alerta.lanzarAlertaExito('¡Chau!');
      this.router.navigate(['/home']);
    }).catch((error) => {
        this.alerta.lanzarAlertaError(':( '+this.error(error.code));        
      });
  }

  getAuth() {
    return this.afauth.authState;
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




