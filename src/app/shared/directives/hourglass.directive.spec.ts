import { TestBed } from '@angular/core/testing';

import { HourglassDirective } from './hourglass.directive';

describe('HourglassDirective', () => {
  let directive: HourglassDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HourglassDirective ]
    });
    directive = new HourglassDirective(null, null);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
