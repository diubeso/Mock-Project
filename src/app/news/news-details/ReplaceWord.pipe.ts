import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ReplaceWord',
})
export class ReplaceWordPipe implements PipeTransform {
  transform(value: string, args?: any[]): string {
    //replace myString
    for (var key in args) {
      value = value.replace('{{' + key + '}}', '');
    }
    return value;
  }
}
