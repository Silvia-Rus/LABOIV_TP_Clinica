import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Pipe({
  name: 'fechahoraturno'
})
export class FechaHoraTurnoPipe implements PipeTransform {


  transform(value: Turno, args?: any): any {
    return `${value.dia} -  ${value.hora}`;
  }

}
