import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Directive({
  selector: '[appHourglass]'
})
export class HourglassDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @Input('appHourglass') set appHourglass(courseItem: CourseItemInterface) {
    const duration = courseItem.duration;
    console.log('duration', duration);
    if (duration > 90){
      this.render.setStyle(this.el.nativeElement, 'visibility', 'visible');
    } else if (duration <= 90) {
      this.render.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }
  }

}
