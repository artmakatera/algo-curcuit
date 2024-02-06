import { describe, it, expect } from "vitest";


// Constants
import { STEPS } from "@/widgets/binary-search-visualize/model/constants";
// Functions
import { binarySearch } from "@/widgets/binary-search-visualize/model/binary-search";



const binarySearchCaller = (binarySearchGen: typeof binarySearch, arr: number[], target: number) => {
  let generator = binarySearchGen(arr, target);
  let result = generator.next()
  while (!result.done) {
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

  it("should yield the correct steps", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const target = 5
    const generator = binarySearch(arr, target)
    expect(generator.next()).toEqual({ value: { type: STEPS.start, start: 0, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 3, start: 0, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.ifStart, start: 0, end: 6, middleIndex: 3 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 5, start: 4, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.ifEnd, middleIndex: 5, start: 4, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 4, start: 4, end: 4 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.result, middleIndex: -1, result: 4 }, done: false })
  });
  it("should yield the correct steps in non found target and -1 result", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const target = 8
    const generator = binarySearch(arr, target)
    expect(generator.next()).toEqual({ value: { type: STEPS.start, start: 0, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 3, start: 0, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.ifStart, start: 0, end: 6, middleIndex: 3 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 5, start: 4, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.ifStart, middleIndex: 5, start: 4, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.middleIndex, middleIndex: 6, start: 6, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.ifStart, middleIndex: 6, start: 6, end: 6 }, done: false })
    expect(generator.next()).toEqual({ value: { type: STEPS.notFound, start: -1, end: -1, middleIndex: -1 }, done: false })
  });

});