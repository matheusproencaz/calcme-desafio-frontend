import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  phone: string = '';

  transform(value: string, ...args: unknown[]): unknown {
    const DDD = value.slice(0, 2);
    const extraNine = value.slice(2,3);
    const firstNumbers = value.slice(3,7);
    const lastNumbers = value.slice(7, value.length);
    return `(${DDD}) ${extraNine} ${firstNumbers}-${lastNumbers}`;
  }

}
