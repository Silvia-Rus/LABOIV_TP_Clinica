import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore'
import { AlertService } from './alert.service';
import { Usuario } from 'src/app/clases/usuario';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any;
  coleccion: string = 'usuarios';
  public listUrl: string[] = [];

  constructor(private db: AngularFirestore,
              private alerta: AlertService,
              public st: Storage,
              // public auth: AuthService
              ) { }

  public async addUsuario(usuario: Usuario, archivos: any) {
      console.log("llega aquí al add");
      var verificado;
      usuario.rol == 'Especialista' ? verificado = 'false' : verificado = 'true';
      this.usuario = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        edad: usuario.edad,
        email: usuario.email,
        password: usuario.password,
        obraSocial: usuario.obraSocial,
        especialidad: usuario.especialidad,
        rol: usuario.rol,
        verificado: verificado,
        // photoUrl: usuario.photoUrl,
        // imageUrl: usuario.imageUrl,
        creado: serverTimestamp(),
        log: serverTimestamp(),
    }
    console.log(this.usuario);
    this.db.collection(this.coleccion).add(this.usuario)
              .then(() => {console.log("then")})
              .catch((error) => {
                this.alerta.lanzarAlertaError(error);        
                }); 
  }

  async subirImagenes(usuario: string, archivos: any)
  {
    console.log(archivos[0])
    console.log(archivos[1])

    for (let index = 0; index < archivos.length; index++){
      this.subirImagen(usuario, archivos[index]);
    }
  }

  async subirImagen(usuario: string, archivos: any) {
    console.log(archivos);
    const imgRef = ref(this.st, 'images/' + usuario + "/" + new Date().getTime().toString());
    const element = archivos[0];
    console.log(element);
    const metadata = {
      contentType: 'image',
    };
    await uploadBytes(imgRef, element)
      .then()
      .catch(error => console.log(error));

    // for (let index = 0; index < files.length; index++) {
    //   const imgRef = ref(this.st, 'images/' + user + "/" + new Date().getTime().toString());
    //   const element = files[index];
    //   console.log(element);
    //   console.log(index);
    //   await uploadBytes(imgRef, element)
    //     .then()
    //     .catch(error => console.log(error));
    // }
  }

  async getImages(user: string) {
    console.log("llega al getimages");
    console.log(user);
    this.listUrl = [];
    const storage = firebase.storage();
    const imagesRef = storage.ref('images/' + user);
    await listAll(imagesRef).then(async res => {
      console.log("entra al list");
      console.log(res);
      for (let item of res.items) {
        console.log("entra al FOR");
        await getDownloadURL(item).then(res => { this.listUrl.push(res); });
      }
    }).catch(error => console.log(error));
  }
  ///VIEJAS

  actualizarDato(mail: string, campo: any, nuevoDato: any)
  {
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('mail', '==',mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            campo: nuevoDato
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  getNombre(mail: any)
  {
    return this.db.collection(this.coleccion , ref => ref.where("mail", "==", mail)).snapshotChanges();
  }

  grabarLog(mail: string)
  {
    this.actualizarDato(mail, 'log', serverTimestamp());
  }
}
