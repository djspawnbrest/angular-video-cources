import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { ICourseItem } from '../../course-list/models/course-item.model';

@Directive({
  selector: '[appCreationDate]'
})
export class CreationDateDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @Input('appCreationDate') set appCreationDate(courseItem: ICourseItem) {
    let color = null;

    const currDate = new Date();
    const currTime = currDate.getTime();
    const freshTime = new Date(currDate.getFullYear(), currDate.getMonth(), (currDate.getDate() - 14) ).getTime();

    const courseTime = Number(courseItem.creationDate);

    if (courseTime <= currTime && courseTime >= freshTime) {
      color = 'rgba(0, 165, 114, 0.5)';
    } else if (courseTime > currTime) {
      color = 'rgba(87, 160, 211, 0.5)';
    }

    if (color != null) {
      this.render.setStyle(this.el.nativeElement, 'border-color', color);
    }
  }
}
