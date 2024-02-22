import { describe, it, expect } from "vitest";


// Constants
import { STEPS } from "@/widgets/binary-search-visualize/model/constants";
// Functions
import { binarySearchRotatedSortedArray } from "@/widgets/binary-search-visualize/model/binary-search-rotated-array";
import { binarySearchCaller } from "./binary-search.test";



describe('binarySearchRotatedSortedArray', () => {
  it('should return 0 if the target is the first element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 1;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(0);
  });

  it('should return 4 if the target is the last element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 5;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(4);
  });

  it('should return 2 if the target is the middle element', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 3;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(2);
  });

  it('should return -1 if the target is not in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 6;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(-1);
  });

  it('should return 0 if the target is the first element in a rotated array', () => {
    const arr = [4, 5, 1, 2, 3];
    const target = 4;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(0);
  });

  it('should return 4 if the target is the last element in a rotated array', () => {
    const arr = [4, 5, 1, 2, 3];
    const target = 3;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(4);
  });

  it('should return 2 if the target is the middle element in a rotated array', () => {
    const arr = [4, 5, 1, 2, 3];
    const target = 1;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(2);
  });

  it('should return -1 if the target is not in the rotated array', () => {
    const arr = [4, 5, 1, 2, 3];
    const target = 6;
    expect(binarySearchCaller(binarySearchRotatedSortedArray, arr, target)).toBe(-1);
  }
  );
});