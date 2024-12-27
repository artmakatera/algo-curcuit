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
        
    while (left.length > 0 || right.length > 0) {
        if (right.length === 0 || left[0] < right[0] ) {
            result.push(left.shift());
        } else {
              result.push(right.shift());
        }
    }

    return result; 
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
    [STEPS.addFirstArray]: [1, 2, 20],
    [STEPS.addFirstSubArray]: [1, 20, 3, 7, 4, 5],
    [STEPS.addingFirstItem]: [1, 20, 3, 7, 6],
    [STEPS.firstCollapsePreviousArray]: [1, 22, 9, 20],
    [STEPS.addArray]: [1, 34, 9, 10, 20],
    [STEPS.addSubArray]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 23],
    [STEPS.addingLeftSortedItem]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 26, 27, 28],
    [STEPS.addedLeftSortedItem]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 26, 27, 28],
    [STEPS.addingRightSortedItem]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 28, 29, 30],
    [STEPS.addedRightSortedItem]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 28, 29, 30],
    [STEPS.moveSubArray]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 28, 29, 30],
    [STEPS.movingSubArray]: [1, 34, 9, 10, 11, 12, 13, 20, 22, 25, 31, 28, 29, 30],

    // [STEPS.compare]: [4, 6],
    // [STEPS.swap]: [4, 5, 6],
    // [STEPS.sortedIndex]: [10],
    // [STEPS.end]: [10]

};


const model = {
    code,
    highlightLines,
    language: LANGUAGES.javascript,
}

export default model;