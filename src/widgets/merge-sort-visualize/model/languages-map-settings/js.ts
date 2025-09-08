import { LANGUAGES, STEPS } from "../constants";



const code = `function mergeSort(array) {
    let splitedArrays = []
    for(let item of array) {
        let newItem = [];
        splitedArrays.push(newItem)
        newItem.push(item)
    }

    while (splittedArrays.length > 1) {
        let arr= []
        for (let i = 0; i < splittedArrays.length; i += 2) {    
            arr.push(merge(splittedArrays[i + 1], splittedArrays[i]))    
        }

        if (arrays.length % 2 !== 0) {
            result.push(arrays[arrays.length - 1])
        }

        splittedArrays = arr
    }

    const [result] = splittedArrays

   return result;
}

function merge(left = [], right = []) {
    const result = [];
    let leftPointer = 0;
    let rightPointer = 0;

    while (leftPointer < left.length && rightPointer < right.length) {
        if (left[leftPointer] < right[rightPointer]) {
            result.push(left[leftPointer]);
            leftPointer++;
        } else {
            result.push(right[rightPointer]);
            rightPointer++;
        }
    }

    while (leftPointer < left.length) {
        result.push(left[leftPointer]);
        leftPointer++;
    }
    
    while (rightPointer < right.length) {
        result.push(right[rightPointer]);
        rightPointer++;
    }

    return result; 
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
    [STEPS.addFirstArray]: [1, 2, 25],
    [STEPS.addFirstSubArray]: [1, 25, 3, 7, 4, 5],
    [STEPS.addingFirstItem]: [1, 25, 3, 7, 6],
    [STEPS.firstCollapsePreviousArray]: [1, 20, 9, 25],
    [STEPS.addArray]: [1, 20, 9, 10, 25],
    [STEPS.addSubArray]: [1, 9, 10, 11, 12, 13, 25, 27, 28, 29, 30, 53],
    [STEPS.compareItems]: [1, 9, 10, 11, 12, 13, 25, 27, 32, 40, 53],
    [STEPS.addingLeftSortedItem]: [1, 9, 10, 11, 12, 13, 25, 27, 32, 33, 34, 40, 53],
    [STEPS.addedLeftSortedItem]: [1, 9, 10, 11, 12, 13, 25, 27, 32, 33, 35, 40, 53],
    [STEPS.addingRightSortedItem]: [1, 9, 10, 11, 12, 13, 25, 27, 32, 36, 37, 39, 40, 53],
    [STEPS.addedRightSortedItem]: [1, 9, 10, 11, 12, 13, 25, 27, 32, 36, 38, 39, 40, 53],
    [STEPS.addingLeftSortedItemEnd]: [1, 9, 10, 11, 12, 13, 25, 27, 42, 43, 45],
    [STEPS.addedLeftSortedItemEnd]: [1, 9, 10, 11, 12, 13, 25, 27, 42, 44, 45],
    [STEPS.addingRightSortedItemEnd]: [1, 9, 10, 11, 12, 13, 25, 27, 47, 48, 50],
    [STEPS.addedRightSortedItemEnd]: [1, 9, 10, 11, 12, 13, 25, 27, 47, 49, 50],
    [STEPS.moveSubArray]: [1, 25, 15, 16, 17],
    [STEPS.movingSubArray]: [1, 25, 15, 16, 17],
    [STEPS.collapsePreviousArray]: [1, 25, 9, 20, 18, 19],
    [STEPS.end]: [1, 25, 22, 23, 24],


};


const model = {
    code,
    highlightLines,
    language: LANGUAGES.javascript,
}

export default model;