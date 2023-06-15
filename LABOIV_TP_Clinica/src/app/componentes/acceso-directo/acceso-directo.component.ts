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
  public users = ['kiben40787@anwarb.com',  //pac 1
                  'bewig40097@aramask.com', //pac 2
                  'yajabi1842@byorby.com',  //pac 3
                  'dewaboc287@byorby.com',  //esp 1
                  'caviji6942@aramask.com', //esp 2
                  'jeyax11606@byorby.com'   //admin
                 ]

  ngOnInit() {
    this.storage.getImagenes(this.users);
  }

  logUser(user: string)
  {
    this.user.emit(user);    
  }
}
