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
  public listaUrldelMismo: string[] = [];
  public listaUrlParaVarios: string[] = [];
  public usuarioObj: any;
  public listaItems: [] = [];

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
  }

  async getImages(user: string) {
    const storage = firebase.storage();
    const imagesRef = storage.ref('images/' + user);
    await listAll(imagesRef).then(async res => {  
      for (let item of res.items) {
        await getDownloadURL(item).then(res => {
          this.listaUrldelMismo.push(res); 
          });
      }
    }).catch(error => console.log(error));
  }

  async getImagenes(users: any) {
    this.listaUrlParaVarios = [];
    for(let i = 0; i < users.length; i++)
    {
      const storage = firebase.storage();
      const imagesRef = storage.ref('images/' + users[i]);
      await listAll(imagesRef).then(async res => {
        await getDownloadURL(res.items[0]).then(res=> {
          this.listaUrlParaVarios.push(res);
        })
      })
    }
  }

  getCollection(coleccion: string) {
    return this.db.collection(coleccion, ref => ref.orderBy('nombre', 'asc')).valueChanges();
  }

  aprobarUser(mail: string)
  {
    console.log(mail);
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('email','==',mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            verificado: "true"
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  ///VIEJAS
  actualizarDato(mail: string, campo: any, nuevoDato: any)
  {
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('email','==',mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const campoAux = campo;
          doc.ref.update({
            campoAux: nuevoDato
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  async getUser(mail: any)
  {
    this.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
    firebase
    .firestore()
    .collection(this.coleccion)
    .where('email', '==', mail)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
       this.usuarioObj  = new Usuario(doc.data()["nombre"],
                                    doc.data()["apellido"],
                                    doc.data()["dni"],
                                    doc.data()["edad"],
                                    doc.data()["email"],
                                    '',
                                    doc.data()["rol"],
                                    doc.data()["obraSocial"],
                                    doc.data()["especialidad"])
      });
    })
    .catch((error) => {
      console.log('Error grabando: ', error);
    });
  }

  grabarLog(mail: string)
  {
    this.actualizarDato(mail, 'log', serverTimestamp());
  }
}
