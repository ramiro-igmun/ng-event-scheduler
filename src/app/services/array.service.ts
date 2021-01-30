import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  swapListElements(currentIndex: number, previousIndex: number, list: any[]): any[] {
    const array = [...list];
    [array[currentIndex], array[previousIndex]] = [array[previousIndex], array[currentIndex]];
    return array;
  }

  moveElementInList(currentIndex: number, previousIndex: number, list: any[]): any[] {
    const array = [...list];
    const element = array.splice(previousIndex, 1)[0];
    array.splice(currentIndex, 0, element);
    return array;
  }
}
