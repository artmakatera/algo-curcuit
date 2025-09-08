import { StepSnapshot } from './types'
import { STEPS } from './constants'





export function* mergeSort(arr: number[]): Generator<StepSnapshot, void, unknown> {
  yield { type: STEPS.start, firstArray: [...arr], secondArray: null, indexOfSourceSubArray: -1, indexOfTargetSubArray: -1, moveIndex: -1, targetIndex: -1, sourceIndexesToMerge: [] };
  yield { type: STEPS.addFirstArray, firstArray: [...arr], secondArray: [[NaN]], indexOfSourceSubArray: -1, indexOfTargetSubArray: -1, moveIndex: -1, targetIndex: -1, sourceIndexesToMerge: [] };

  let firstArray: number[] | number[][] = [...arr];
  let secondArray: number[][] | null = [];
  for (let i = 0; i < firstArray.length; i++) {
    yield {
      type: STEPS.addFirstSubArray,
      firstArray: cloneArray(firstArray).slice(i),
      secondArray: cloneArray(secondArray).concat([[NaN]]),
      indexOfSourceSubArray: -1,
      indexOfTargetSubArray: -1,
      moveIndex: -1,
      targetIndex: -1,
      sourceIndexesToMerge: []
    }
    yield {
      type: STEPS.addingFirstItem,
      firstArray: cloneArray(firstArray).slice(i),
      secondArray: cloneArray(secondArray).concat([[NaN]]),
      indexOfSourceSubArray: 0,
      indexOfTargetSubArray: i,

      moveIndex: 0,
      targetIndex: 0,
      sourceIndexesToMerge: []
    }

    secondArray.push([firstArray[i]]);

    yield {
      type: STEPS.addingFirstItem,
      firstArray: cloneArray(firstArray).slice(i + 1),
      secondArray: cloneArray(secondArray),
      moveIndex: -1,
      indexOfSourceSubArray: -1,
      indexOfTargetSubArray: -1,
      targetIndex: -1,
      sourceIndexesToMerge: []
    }
  }

  yield {
    type: STEPS.firstCollapsePreviousArray,
    firstArray: [],
    secondArray: cloneArray(secondArray),
    moveIndex: -1,
    indexOfSourceSubArray: -1,
    indexOfTargetSubArray: -1,
    targetIndex: -1,
    sourceIndexesToMerge: []
  }
  firstArray = secondArray;
  secondArray = null;

  yield {
    type: STEPS.firstCollapsePreviousArray,
    firstArray: cloneArray(firstArray),
    secondArray,
    moveIndex: -1,
    indexOfSourceSubArray: -1,
    indexOfTargetSubArray: -1,
    targetIndex: -1,
    sourceIndexesToMerge: []
  }

  yield { type: STEPS.addArray, firstArray: cloneArray(firstArray), secondArray: [[NaN]], indexOfSourceSubArray: -1, indexOfTargetSubArray: -1, moveIndex: -1, targetIndex: -1, sourceIndexesToMerge: [] };

  let arrays = firstArray;

  while (arrays.length !== 1) {

    let result: number[][] = []

    for (let i = 1; i < arrays.length; i += 2) {
      let subArr: number[] = []
      const prevArr: number[] = arrays[i - 1];
      const currentArr: number[] = arrays[i];

      yield {
        type: STEPS.addSubArray,
        firstArray: cloneArray(arrays),
        secondArray: cloneArray(result).concat([[NaN]]) as number[][],
        indexOfSourceSubArray: -1,
        indexOfTargetSubArray: -1,
        moveIndex: -1,
        targetIndex: -1,
        subArraysIndexesToMerge: [i - 1, i],
        sourceIndexesToMerge: [0, 0]
      };

      while (prevArr.length > 0 && currentArr.length > 0) {
        yield {
          type: STEPS.compareItems,
          firstArray: cloneArray(arrays),
          secondArray: cloneArray(result).concat([subArr.concat(NaN)] as number[][]) as number[][],
          indexOfSourceSubArray: -1,
          indexOfTargetSubArray: -1,
          moveIndex: -1,
          targetIndex: -1,
          subArraysIndexesToMerge: [i - 1, i],
          sourceIndexesToMerge: [0, 0]
        };
        if (currentArr[0] < prevArr[0]) {
          yield {
            type: STEPS.addingRightSortedItem,
            firstArray: cloneArray(arrays),
            secondArray: cloneArray(result).concat([subArr.concat(NaN)] as number[][]) as number[][],
            indexOfSourceSubArray: i,
            indexOfTargetSubArray: result.length,
            moveIndex: 0,
            targetIndex: subArr.length,
            subArraysIndexesToMerge: [i - 1, i],
            sourceIndexesToMerge: [0, 0]
          }
          subArr.push(currentArr.shift() as number)
          yield {
            type: STEPS.addedRightSortedItem,
            firstArray: cloneArray(arrays),
            secondArray: cloneArray(result).concat([cloneArray(subArr)] as number[][]),
            moveIndex: -1,
            indexOfSourceSubArray: -1,
            indexOfTargetSubArray: -1,
            targetIndex: -1,
            subArraysIndexesToMerge: [i - 1, i],

            sourceIndexesToMerge: []
          }
        } else {

          yield {
            type: STEPS.addingLeftSortedItem,
            firstArray: cloneArray(arrays),
            secondArray: cloneArray(result).concat([subArr.concat(NaN)] as number[][]) as number[][],
            indexOfSourceSubArray: i - 1,
            indexOfTargetSubArray: result.length,
            moveIndex: 0,
            targetIndex: subArr.length,
            subArraysIndexesToMerge: [i - 1, i],
            sourceIndexesToMerge: [0, 0]
          }
          subArr.push(prevArr.shift() as number)
          yield {
            type: STEPS.addedLeftSortedItem,
            firstArray: cloneArray(arrays),
            secondArray: cloneArray(result).concat([cloneArray(subArr)] as number[][]),
            moveIndex: -1,
            indexOfSourceSubArray: -1,
            indexOfTargetSubArray: -1,
            targetIndex: -1,
            subArraysIndexesToMerge: [i - 1
              , i], sourceIndexesToMerge: []
          }
        }
      }

      // If there are remaining elements in either array, add them to the end
      while (prevArr.length > 0) {
        yield {
          type: STEPS.addingLeftSortedItemEnd,
          firstArray: cloneArray(arrays),
          secondArray: cloneArray(result).concat([subArr.concat(NaN)] as number[][]) as number[][],
          indexOfSourceSubArray: i - 1,
          indexOfTargetSubArray: result.length,
          moveIndex: 0,
          targetIndex: subArr.length,
          subArraysIndexesToMerge: [i - 1, i],
          sourceIndexesToMerge: [0, 0]
        }
        subArr.push(prevArr.shift() as number)
        yield {
          type: STEPS.addedLeftSortedItemEnd,
          firstArray: cloneArray(arrays),
          secondArray: cloneArray(result).concat([cloneArray(subArr)] as number[][]),
          moveIndex: -1,
          indexOfSourceSubArray: -1,
          indexOfTargetSubArray: -1,
          targetIndex: -1,
          subArraysIndexesToMerge: [i - 1, i],
          sourceIndexesToMerge: []
        }
      }
      while (currentArr.length > 0) {
        yield {
          type: STEPS.addingRightSortedItemEnd,
          firstArray: cloneArray(arrays),
          secondArray: cloneArray(result).concat([subArr.concat(NaN)] as number[][]) as number[][],
          indexOfSourceSubArray: i,
          indexOfTargetSubArray: result.length,
          moveIndex: 0, targetIndex: subArr.length,
          subArraysIndexesToMerge: [i - 1, i],
          sourceIndexesToMerge: [0, 0]
        }
        subArr.push(currentArr.shift() as number)
        yield {
          type: STEPS.addedRightSortedItemEnd,
          firstArray: cloneArray(arrays),
          secondArray: cloneArray(result).concat([cloneArray(subArr)] as number[][]),
          moveIndex: -1,
          indexOfSourceSubArray: -1,
          indexOfTargetSubArray: -1,
          targetIndex: -1,
          subArraysIndexesToMerge: [i - 1, i],
          sourceIndexesToMerge: []
        }
      }


      result.push(subArr as number[])


    }


    if (arrays.length % 2 !== 0) {
      yield {
        type: STEPS.moveSubArray,
        firstArray: cloneArray(arrays),
        secondArray: cloneArray(result).concat([Array(arrays[arrays.length - 1].length).fill(NaN)]) as number[][],
        moveIndex: -1,
        indexOfSourceSubArray: arrays.length - 1,
        indexOfTargetSubArray: result.length,
        targetIndex: -1,
        subArraysIndexesToMerge: [arrays.length - 1, -1],
        sourceIndexesToMerge: []
      }


      result.push(arrays[arrays.length - 1])
      yield {
        type: STEPS.movingSubArray,
        firstArray: cloneArray(arrays.slice(0, arrays.length - 1)),
        secondArray: cloneArray(result) as number[][],
        moveIndex: -1,
        indexOfSourceSubArray: - 1,
        indexOfTargetSubArray: -1,
        targetIndex: -1,
        sourceIndexesToMerge: []
      }
    }
    arrays = result as number[][];

    yield {
      type: STEPS.collapsePreviousArray,
      firstArray: [],
      secondArray: cloneArray(result),
      moveIndex: -1,
      indexOfSourceSubArray: -1,
      indexOfTargetSubArray: -1,
      targetIndex: -1,
      sourceIndexesToMerge: []
    }
  }

  yield {
    type: STEPS.end,
    firstArray: [],
    secondArray: cloneArray(arrays),
    moveIndex: -1,
    indexOfSourceSubArray: -1,
    indexOfTargetSubArray: -1,
    targetIndex: -1,
    sourceIndexesToMerge: []
  }


}

function cloneArray<T extends number | number[]>(arr: T[]): T[] {
  return arr.map((item) => {
    if (Array.isArray(item)) {
      return cloneArray(item as number[]) as T;
    }
    return item as T;
  }) as T[];
}