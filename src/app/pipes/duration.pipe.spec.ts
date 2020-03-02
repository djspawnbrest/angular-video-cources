import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;
  it('create an instance', () => {
    pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transafort 60min to "1h. "', () => {
    const expected = pipe.transform(60);
    expect(expected).toBe('1h');
  });

  it('should transaform 80 to "1h. 20min"', () => {
    const expected = pipe.transform(80);
    expect(expected).toBe('1h 20min');
  });

  it('should transaform 20 to "20min"', () => {
    const expected = pipe.transform(20);
    expect(expected).toBe(' 20min');
  });
});
