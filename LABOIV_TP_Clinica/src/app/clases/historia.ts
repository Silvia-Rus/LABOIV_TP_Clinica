export class Historia{
    pacNombre: any;
    pacApellido: any;
    pacEmail: any;
    altura: any;
    peso: any;
    temperatura: any;
    presion: any;
    otrosDatos: any[]=[];

    constructor(pacNombre: any, pacApellido: any, pacEmail: any, altura: any, peso: any, temperatura: any, presion: any, otrosDatos = [])
    {
        this.pacNombre = pacNombre;
        this.pacApellido = pacApellido;
        this.pacEmail = pacEmail;
        this.altura = altura;
        this.peso = peso;
        this.temperatura = temperatura;
        this.presion = presion;
        this.otrosDatos = otrosDatos;
    }

}