export class Turno{
    esptaNombre: any;
    esptaEmail: any;
    especialidad: any;
    dia: any;
    hora: any;

    constructor(esptaNombre: any, 
                esptaEmail: any,
                especialidad: any, 
                dia: any, 
                hora: any){
        this.esptaNombre = esptaNombre;
        this.esptaEmail = esptaEmail;
        this.especialidad = especialidad,
        this.dia = dia;
        this.hora = hora;
    }
}