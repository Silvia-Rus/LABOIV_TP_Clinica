import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Historia } from 'src/app/clases/historia';


@Component({
  selector: 'app-registro-historia',
  templateUrl: './registro-historia.component.html',
  styleUrls: ['./registro-historia.component.css']
})
export class RegistroHistoriaComponent implements OnInit {

  form!: FormGroup;
  @Input() turno: any;
  otrosDatos: any[] = [];
  tieneHistoria: any;

  constructor(private readonly fb: FormBuilder,
    private db: AuthService,
    private st: StorageService) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      altura: ['', [Validators.min(50), Validators.max(220)]],
      peso: ['', [Validators.min(1), Validators.max(220)]],
      temperatura: ['', [Validators.min(34), Validators.max(45)]],
      presion: ['', [Validators.min(2), Validators.max(30)]],
      datoUnoClave: [''],
      datoUnoValor: [''],
      datoDosClave: [''],
      datoDosValor: [''],
      datoTresClave: [''],
      datoTresValor: ['']
    })

    //fijarse si ya tiene historia el paciente que entra por input y
    // si tiene marcar como que sí
    // tirar los valores al input
  

      var numero: number = +12;
      this.form = this.fb.group({
        altura: [numero],
      });
    
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

  generarOtrosDatos()
  {
    let datoUno = this.form.value.datoUnoClave+'$$'+this.form.value.datoUnoValor;
    let datosDos = this.form.value.datoDosClave+'$$'+this.form.value.datoDosValor;
    let datosTres = this.form.value.datoTresClave+'$$'+this.form.value.datoTresValor;
  }

  crearHistoria()
  {
    console.log(this.form.value.altura);

  // constructor(pacNombre: any, 
  //   pacApellido: any, 
  //   pacEmail: any, 
  //   altura: any, 
  //   peso: any, 
  //   temperatura: any, 
  //   presion: any, 
  //   otrosDatos = [])

    var historia = new Historia(this.turno.pacNombre,
                                this.turno.pacApellido,
                                this.turno.pacEmail,
                                this.form.value.altura,
                                this.form.value.peso,
                                this.form.value.temperatura,
                                this.form.value.presion)
    //grabarlo nuevo o modificar el que existe


  }

}
