import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPipe'
})
export class NumberPipe implements PipeTransform {
  bool = true;
  transform(val: string) {
    const i = val.length;
    if (i === 3) {
      val = val + '-';
      this.bool = false;
    }
    if (i === 7) {
      val = val + '-';
      this.bool = false;
    }
    if (i === 10 && this.bool) {
      val = val.slice(0, 3) + '-' + val.slice(3, 6) + '-' + val.slice(6);
    }
    return val;
  }
}
