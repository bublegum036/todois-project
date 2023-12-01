import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      if (value.length <= 19) {
        return value
      } else {
        return value.substring(0, 19) + '...'
      }
    }
    return value
  }
}