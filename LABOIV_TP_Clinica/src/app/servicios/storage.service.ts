import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore'
import { AlertService } from './alert.service';
import { Usuario } from 'src/app/clases/usuario';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { Horario } from 'src/app/clases/horario';
import { Turno } from 'src/app/clases/turno';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any;
  horario: any;
  turno: any;
  coleccion: string = 'usuarios';
  public listaUrldelMismo: string[] = [];
  public listaUrlParaVarios: string[] = [];
  public usuarioObj: any;
  public listaItems: [] = [];
  public listaHorarios: Horario[] = []

  constructor(private db: AngularFirestore,
              private alerta: AlertService,
              public st: Storage,
              // public auth: AuthService
              ) { }

  public async addUsuario(usuario: Usuario, archivos: any) {
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
                .then(() => {console.log('Se graba el usuario: ', usuario); })
                .catch((error) => {
                this.alerta.lanzarAlertaError(error);        
                }); 
  }

  public async addHorario(horario: Horario)
  {
    this.horario = {
      nombre: horario.nombre,
      email: horario.email,
      clave: horario.clave,
      diaSemana: horario.diaSemana,
      horaHasta: horario.horaHasta,
      horaDesde: horario.horaDesde,
      creado: serverTimestamp(),
      log: serverTimestamp(),
    }

    this.db.collection('horarios').add(this.horario)
           .then(() => {console.log('Se graba el horario: ', horario.clave); })
           .catch((error) =>  {console.log('Errror grabando el horario: ', error); });
  }

  public async addEspecialidad(especialidad: string)
  {
    firebase
      .firestore()
      .collection('especialidades')
      .where('nombre','==',especialidad)
      .get()
      .then((querySnapshot) => {
        if(querySnapshot.size == 0)
        {
          this.db.collection('especialidades').add({nombre: especialidad})
          .then(() => {console.log('Se graba la especialidad: ', especialidad);   })
          .catch((error) => {
            console.log('Error grabando: ', error);        
            }); 
        }
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  public async addTurno(turno: Turno){
    var clave = turno.esptaEmail+'_'+turno.dia+'_'+turno.hora;
    this.turno = {
      esptaNombre: turno.esptaNombre,
      esptaApellido: turno.esptaApellido,
      esptaEmail: turno.esptaEmail,
      pacNombre: turno.pacNombre,
      pacApellido: turno.pacApellido,
      pacEmail: turno.pacEmail,
      especialidad: turno.especialidad,
      diaSemana: turno.diaSemana,
      dia: turno.dia,
      hora: turno.hora,
      clave: clave,
      estado: 'nuevo',
      resenia: '',
      motivo_cancel: '',
      motivo_rechazo: ''
    }

    this.db.collection('turnos').add(this.turno)
           .then(() => {console.log('Se graba el turno: ', clave); })
           .catch((error) =>  {console.log('Errror grabando el turno: ', error); });

  }

  public async addHorarioConValidacion(horario: Horario)
  {
    firebase
      .firestore()
      .collection('horarios')
      .where('clave','==', horario.clave)
      .get()
      .then((querySnapshot) => {
        if(querySnapshot.size == 0)
        {
          this.addHorario(horario);
        }
        else
        {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              horaHasta: horario.horaHasta,
              horaDesde: horario.horaDesde,
              log: serverTimestamp(),
            }).then(() => {console.log("Se actualizó "+horario.clave)})
          });
        }
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
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

  async getImages(user: any) {
    this.listaUrldelMismo = []; 
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

  getCollection(coleccion: string, ordenadaPor: string) {
    return this.db.collection(coleccion, ref => ref.orderBy(ordenadaPor, 'asc')).valueChanges();
  }

  aprobarUser(mail: string)
  {
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



  grabarLog(mail: string)
  {
    this.actualizarDato(mail, 'log', serverTimestamp());
  }
}
