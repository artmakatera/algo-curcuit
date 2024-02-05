import { describe, it,expect } from "vitest";
import { binarySearch } from "@/widgets/binary-search-visualize/model/binary-search";



const binarySearchCaller= (binarySearchGen: typeof binarySearch, arr: number[], target:number ) => {
  let generator = binarySearchGen(arr, target);
  let result = generator.next()
  while(!result.done){
    result = generator.next()
  }
  return result.value;
}

describe('binarySearch', () => {
  it('should return 0 if the target is the first element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 1;
    expect(binarySearchCaller(binarySearch, arr, target)).toBe(0);
  });

  it('should return 4 if the target is the last element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 5;
    expect(binarySearchCaller(binarySearch, arr, target)).toBe(4);
  });

  it('should return 2 if the target is the middle element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 3;
    expect(binarySearchCaller(binarySearch, arr, target)).toBe(2);
  });

  it('should return -1 if the target is not in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 6;
    expect(binarySearchCaller(binarySearch, arr, target)).toBe(-1);
  });
  
});