import { STEPS } from "./constants";

function swap(heap: number[], i: number, j: number) {
  [heap[i], heap[j]] = [heap[j], heap[i]];
}

export function getLeftChild(index: number) {
  return 2 * index + 1;
}

export function getRightChild(index: number) {
  return 2 * index + 2;
}

function parent(index: number) {
  return Math.floor((index - 1) / 2);
}

export function* push(heap: number[], value: number) {
  yield {
    type: STEPS.startTraverse,
    value,
    index: heap.length,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };

  heap.push(value);

  yield {
    type: STEPS.pushValue,
    value,
    index: heap.length - 1,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };

  let currentIndex = heap.length - 1;
  let parentIndex = parent(currentIndex);

  yield {
    type: STEPS.compareNodes,
    value,
    index: currentIndex,
    compareIndexes: [currentIndex, parentIndex],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };

  while (currentIndex > 0 && heap[currentIndex] < heap[parentIndex]) {
    yield {
      type: STEPS.compareNodes,
      value,
      index: currentIndex,
      compareIndexes: [currentIndex, parentIndex],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
    };
    yield {
      type: STEPS.swap,
      value,
      index: currentIndex,
      compareIndexes: [currentIndex, parentIndex],
      swapIndexes: [currentIndex, parentIndex],
      removeIndex: -1,
      heap: [...heap],
    };
    swap(heap, currentIndex, parentIndex);
    currentIndex = parentIndex;
    parentIndex = parent(currentIndex);

    yield {
      type: STEPS.swapped,
      value,
      index: currentIndex,
      compareIndexes: [],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
    };
  }

  yield {
    type: STEPS.endTraverse,
    value,
    index: currentIndex,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };
}

export function* pop(heap: number[]) {
  if (heap.length === 0) return null;

  const minValue = heap[0];
  yield {
    type: STEPS.peekValue,
    value: minValue,
    index: 0,
    heap: [...heap],
    swapIndexes: [],
    compareIndexes: [],
    removeIndex: -1,
  };

  if (heap.length === 1) return heap.pop();

  yield {
    type: STEPS.popValue,
    value: minValue,
    index: 0,
    removeIndex: heap.length - 1,
    swapIndexes: [],
    compareIndexes: [],
    heap: [...heap],
  };

  yield {
    type: STEPS.moveLastToTop,
    value: minValue,
    index: 0,
    removeIndex: heap.length - 1,
    swapIndexes: [],
    compareIndexes: [],
    heap: [...heap],
  };
  heap[0] = heap.pop()!;

  let currentIndex = 0;
  const length = heap.length;

  while (true) {
    const leftIndex = getLeftChild(currentIndex);
    const rightIndex = getRightChild(currentIndex);

    yield {
      type: STEPS.compareNodes,
      value: minValue,
      index: currentIndex,
      compareIndexes: [leftIndex, rightIndex, currentIndex],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
    };

    let smallestIndex = currentIndex;

    if (leftIndex < length && heap[leftIndex] < heap[smallestIndex]) {
      yield {
        type: STEPS.swapLeft,
        value: minValue,
        index: currentIndex,
        compareIndexes: [leftIndex, rightIndex, currentIndex],
        swapIndexes: [leftIndex, currentIndex],
        removeIndex: -1,
        heap: [...heap],
      };

      smallestIndex = leftIndex;
    }

    if (rightIndex < length && heap[rightIndex] < heap[smallestIndex]) {
      yield {
        type: STEPS.swapRight,
        value: minValue,
        index: currentIndex,
        compareIndexes: [leftIndex, rightIndex, currentIndex],
        swapIndexes: [rightIndex, currentIndex],
        removeIndex: -1,
        heap: [...heap],
      };

      smallestIndex = rightIndex;
    }

    if (smallestIndex === currentIndex) break;

    swap(heap, currentIndex, smallestIndex);

    currentIndex = smallestIndex;
    yield {
      type: STEPS.swapped,
      value: minValue,
      index: currentIndex,
      compareIndexes: [currentIndex],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
    };
  }

  yield {
    type: STEPS.endTraverse,
    value: minValue,
    index: currentIndex,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };

  return minValue;
}

export function insert(heap: number[], value: number) {
  heap.push(value);
  bubbleUp(heap, heap.length - 1);
}

export function remove(heap: number[]) {
  if (heap.length === 0) return null;
  if (heap.length === 1) return heap.pop();
  const minValue = heap[0];
  heap[0] = heap.pop()!;
  bubbleDown(heap, 0);
  return minValue;
}

export function bubbleDown(heap: number[], index: number) {
  let currentIndex = index;
  const length = heap.length;

  while (true) {
    const leftIndex = getLeftChild(currentIndex);
    const rightIndex = getRightChild(currentIndex);
    let smallestIndex = currentIndex;

    if (leftIndex < length && heap[leftIndex] < heap[smallestIndex]) {
      smallestIndex = leftIndex;
    }

    if (rightIndex < length && heap[rightIndex] < heap[smallestIndex]) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex === currentIndex) break;

    swap(heap, currentIndex, smallestIndex);
    currentIndex = smallestIndex;
  }
}

export function bubbleUp(heap: number[], index: number) {
  let currentIndex = index;
  let parentIndex = parent(currentIndex);

  while (currentIndex > 0 && heap[currentIndex] < heap[parentIndex]) {
    swap(heap, currentIndex, parentIndex);
    currentIndex = parentIndex;
    parentIndex = parent(currentIndex);
  }
}

export function peek(heap: number[]) {
  return heap[0];
}

export function* peekDraw(heap: number[]) {
  if (heap.length === 0) return;

  yield {
    type: STEPS.peekValue,
    value: heap[0],
    index: 0,
    compareIndexes: [0],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
  };
}

export function size(heap: number[]) {
  return heap.length;
}