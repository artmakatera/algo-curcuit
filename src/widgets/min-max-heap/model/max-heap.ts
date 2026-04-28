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
    node: null,
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
    node: null,
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
    node: null,
  };

  while (currentIndex > 0 && heap[currentIndex] > heap[parentIndex]) {
    yield {
      type: STEPS.compareNodes,
      value,
      index: currentIndex,
      compareIndexes: [currentIndex, parentIndex],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    };
    yield {
      type: STEPS.swap,
      value,
      index: currentIndex,
      compareIndexes: [currentIndex, parentIndex],
      swapIndexes: [currentIndex, parentIndex],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    };
    swap(heap, currentIndex, parentIndex);
    yield {
      type: STEPS.swapped,
      value,
      index: currentIndex,
      compareIndexes: [],
      swapIndexes: [parentIndex, currentIndex],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    };
    currentIndex = parentIndex;
    parentIndex = parent(currentIndex);
  }


  yield {
    type: STEPS.endTraverse,
    value,
    index: currentIndex,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
    node: null,
  };
}

export function* pop(heap: number[]) {
  if (heap.length === 0) return null;

  const maxValue = heap[0];
  yield {
    type: STEPS.startTraverse,
    value: maxValue,
    index: 0,
    heap: [...heap],
    swapIndexes: [],
    compareIndexes: [],
    removeIndex: -1,
    node: null,
  };

  if (heap.length === 1) return heap.pop();

  yield {
    type: STEPS.popValue,
    value: maxValue,
    index: 0,
    removeIndex: heap.length - 1,
    swapIndexes: [],
    compareIndexes: [],
    heap: [...heap],
    node: null,
  };


  yield {
    type: STEPS.moveLastToTop,
    value: maxValue,
    index: 0,
    removeIndex: heap.length - 1,
    swapIndexes: [0, heap.length - 1],
    compareIndexes: [],
    heap: [...heap],
    node: null,
  };
  yield {
    type: STEPS.movedLastToTop,
    value: maxValue,
    index: 0,
    removeIndex: 0,
    swapIndexes: [0, heap.length - 1],
    compareIndexes: [],
    heap: [...heap],
    node: null,
  };
  heap[0] = heap.pop()!;

  let currentIndex = 0;
  const length = heap.length;

  while (true) {
    const leftIndex = getLeftChild(currentIndex);
    const rightIndex = getRightChild(currentIndex);

    yield {
      type: STEPS.compareNodes,
      value: maxValue,
      index: currentIndex,
      compareIndexes: [leftIndex, rightIndex, currentIndex],
      swapIndexes: [],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    };

    let largestIndex = currentIndex;

    if (leftIndex < length && heap[leftIndex] > heap[largestIndex]) {
      yield {
        type: STEPS.compareLeft,
        value: maxValue,
        index: currentIndex,
        compareIndexes: [leftIndex, rightIndex, currentIndex],
        swapIndexes: [leftIndex, currentIndex],
        removeIndex: -1,
        heap: [...heap],
        node: null,
      };

      largestIndex = leftIndex;
    }

    if (rightIndex < length && heap[rightIndex] > heap[largestIndex]) {
      yield {
        type: STEPS.compareRight,
        value: maxValue,
        index: currentIndex,
        compareIndexes: [leftIndex, rightIndex, currentIndex],
        swapIndexes: [rightIndex, currentIndex],
        removeIndex: -1,
        heap: [...heap],
        node: null,
      };

      largestIndex = rightIndex;
    }

    if (largestIndex === currentIndex) break;

    yield {
      type: STEPS.swap,
      value: maxValue,
      index: currentIndex,
      compareIndexes: [leftIndex, rightIndex, currentIndex],
      swapIndexes: [largestIndex, currentIndex],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    }

    swap(heap, currentIndex, largestIndex);

    yield {
      type: STEPS.swapped,
      value: maxValue,
      index: currentIndex,
      compareIndexes: [currentIndex],
      swapIndexes: [currentIndex, largestIndex],
      removeIndex: -1,
      heap: [...heap],
      node: null,
    };
    currentIndex = largestIndex;

  }

  yield {
    type: STEPS.endTraverse,
    value: maxValue,
    index: currentIndex,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
    heap: [...heap],
    node: null,
  };

  return maxValue;
}

export function insert(heap: number[], value: number) {
  heap.push(value);
  bubbleUp(heap, heap.length - 1);
}

export function remove(heap: number[]) {
  if (heap.length === 0) return null;
  if (heap.length === 1) return heap.pop();
  const maxValue = heap[0];
  heap[0] = heap.pop()!;
  bubbleDown(heap, 0);
  return maxValue;
}

export function bubbleDown(heap: number[], index: number) {
  let currentIndex = index;
  const length = heap.length;

  while (true) {
    const leftIndex = getLeftChild(currentIndex);
    const rightIndex = getRightChild(currentIndex);
    let largestIndex = currentIndex;

    if (leftIndex < length && heap[leftIndex] > heap[largestIndex]) {
      largestIndex = leftIndex;
    }

    if (rightIndex < length && heap[rightIndex] > heap[largestIndex]) {
      largestIndex = rightIndex;
    }

    if (largestIndex === currentIndex) break;

    swap(heap, currentIndex, largestIndex);
    currentIndex = largestIndex;
  }
}

export function bubbleUp(heap: number[], index: number) {
  let currentIndex = index;
  let parentIndex = parent(currentIndex);

  while (currentIndex > 0 && heap[currentIndex] > heap[parentIndex]) {
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
    node: null,
  };
}

export function size(heap: number[]) {
  return heap.length;
}
