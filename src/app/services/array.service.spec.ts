import { TestBed } from '@angular/core/testing';

import { ArrayService } from './array.service';

describe('ArrayService', () => {
  let service: ArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('swapListElements() should swap items in an array', (done: DoneFn) => {
    const array = service.swapListElements(0, 2, ['a', 'b', 'c']);
    expect(array[0]).toBe('c');
    expect(array[2]).toBe('a');
    done();
  });

  it('moveElementInList() should move an item in an array', (done: DoneFn) => {
    const array = service.moveElementInList(0, 2, ['a', 'b', 'c']);
    expect(array[0]).toBe('c');
    expect(array[2]).toBe('b');
    done();
  });
});
