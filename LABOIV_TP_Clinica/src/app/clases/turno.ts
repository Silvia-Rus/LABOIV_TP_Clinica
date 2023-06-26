export class Turno{
    esptaNombre: any;
    esptaApellido: any;
    esptaEmail: any;
    pacNombre: any;
    pacApellido: any;
    pacEmail: any;
    especialidad: any;
    diaSemana: any;
    dia: any;
    hora: any;
    clave: any;

    constructor(esptaNombre: any, 
                esptaApellido: any,
                esptaEmail: any,
                especialidad: any,
                diaSemana: any, 
                dia: any, 
                hora: any){
        this.esptaNombre = esptaNombre;
        this.esptaApellido = esptaApellido;
        this.esptaEmail = esptaEmail;
        this.especialidad = especialidad,
        this.diaSemana = diaSemana,
        this.dia = dia;
        this.hora = hora;
    }

    turnoMasPaciente(turno: Turno, pacNombre: any, pacApellido: any, pacEmail: any){
        turno.pacNombre= pacNombre;
        turno.pacApellido = pacApellido;
        turno.pacEmail = pacEmail;
    }
}