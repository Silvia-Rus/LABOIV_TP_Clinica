import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore'
import { AlertService } from './alert.service';
import { Usuario } from 'src/app/clases/usuario';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any;
  coleccion: string = 'usuarios';
  public listUrl: string[] = [];

  constructor(private db: AngularFirestore,
              private alerta: AlertService,
              public st: Storage
              ) { }

  public async addUsuario(usuario: Usuario) {
      this.usuario = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        edad: usuario.edad,
        email: usuario.email,
        password: usuario.password,
        obraSocial: usuario.obraSocial,
        especialidad: usuario.especialidad,
        photoUrl: usuario.photoUrl,
        imageUrl: usuario.imageUrl,
        creado: serverTimestamp(),
        log: serverTimestamp(),
        activo: true 
    }
    return await this.db.collection('usuarios').add(this.usuario),
    this.db.collection(this.coleccion).add(this.usuario)
    .then((user)=> {
      // this.alerta.lanzarAlertaExito('¡Usuario grabado con éxito!')
    }).catch((error) => {
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
    await uploadBytes(imgRef, element, metadata)
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
    this.listUrl = [];
    const imagesRef = ref(this.st, 'images/' + user);
    await listAll(imagesRef).then(async res => {
      for (let item of res.items) {
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
