import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): any {
    const hour = Math.floor(duration / 60);
    const min = duration % 60;
    let result = {};
    if (min > 0 && hour >=1) {
      result = {hours: hour, minutes: min}
    } else if (min > 0) {
      result = {minutes: min}
    }
    return result;
  }

}
