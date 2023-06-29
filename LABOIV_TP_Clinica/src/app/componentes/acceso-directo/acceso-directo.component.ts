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
  public imagenes = ['https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fkiben40787%40anwarb.com%2F1686846124111?alt=media&token=f3bf56c8-25fd-442d-bd35-93f68fa0d5b5',
                     'https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fbewig40097%40aramask.com%2F1686846343844?alt=media&token=396f3131-e5a7-4f05-b470-80b46afd10df',
                     'https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fyajabi1842%40byorby.com%2F1686846541459?alt=media&token=61310e01-1ac5-4853-b761-17ad0f7bdd3a',
                     'https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fdewaboc287%40byorby.com%2F1686847046835?alt=media&token=5b5bd881-b28d-49b4-9fe5-344c61b87cdd',
                     'https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fcaviji6942%40aramask.com%2F1686847196844?alt=media&token=070b37a6-1da5-4bac-a9aa-fdd6200016bd',
                     'https://firebasestorage.googleapis.com/v0/b/clinicadrarus.appspot.com/o/images%2Fjeyax11606%40byorby.com%2F1686847340408?alt=media&token=01f26852-5bd0-4a56-9cc6-672b2e9dfded'
                    ]

  ngOnInit() {
    this.storage.getImagenes(this.users);
  }

  logUser(user: string)
  {
    console.log(this.users);
    console.log(user);
    this.user.emit(user);    
  }
}
