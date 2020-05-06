import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  public constructor(
    private translate: TranslateService,
    private readonly async: AsyncPipe
    ) {}

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

  // transform(duration: number): string {
  //   const hour = Math.floor(duration / 60);
  //   const min = duration % 60;
  //   let result = '';
  //   const h = this.async.transform(this.translate.get('ADDEDIT.DURATIONH', {value: hour}).pipe(map( (x: string) => {
  //     return x;
  //   })));
  //   const m = this.async.transform(this.translate.get('ADDEDIT.DURATIONM', {value: min}).pipe(map( (x: string) => {
  //     return x;
  //   })));
  //   if (hour >= 1)  {
  //     result += `${h}`;
  //   }
  //   if (min > 0) {
  //     result += ` ${m}`;
  //   }
  //   return result;
  // }

}
