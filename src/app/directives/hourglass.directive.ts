import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ICourseItem } from '../course-list/models/course-item.model';

@Directive({
  selector: '[appHourglass]'
})
export class HourglassDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input('appHourglass') set appHourglass(courseItem: ICourseItem) {
    const duration = courseItem.duration;
    if (duration > 90) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (duration <= 90) {
      this.viewContainer.clear();
    }
  }

}
