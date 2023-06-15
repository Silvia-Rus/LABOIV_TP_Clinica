import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import firebase from 'firebase/compat/app';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-acceso-directo',
  templateUrl: './acceso-directo.component.html',
  styleUrls: ['./acceso-directo.component.css']
})
export class AccesoDirectoComponent implements OnInit {

  @Output() user = new EventEmitter<string>();
  constructor(public storage: StorageService) { }

  ngOnInit() {
    this.getFoto('silrusma@gmail.com');
    this.getFoto('silviarus.biblio@gmail.com');
  }

  logUser(user: string)
  {
    this.user.emit(user);    
  }

  // getSpecialtyAll(): Observable<Specialty[]> {
  //   const userRef = collection(this.firestore, 'specialty');
  //   return collectionData(userRef, { idField: 'id' }) as Observable<Specialty[]>;
  // }

  getFoto(user: string)
  {
    this.storage.getImages(user);
  }

}
