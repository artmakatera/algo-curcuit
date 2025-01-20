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
    [STEPS.addFirstArray]: [1, 2, 25],
    [STEPS.addFirstSubArray]: [1, 25, 3, 7, 4, 5],
    [STEPS.addingFirstItem]: [1, 25, 3, 7, 6],
    [STEPS.firstCollapsePreviousArray]: [1, 20, 9, 25],
    [STEPS.addArray]: [1, 20, 9, 10, 25],
    [STEPS.addSubArray]: [1, 9, 10, 11, 12, 13, 25, 27, 28, 39],
    [STEPS.compareItems]: [1, 9, 10, 11, 12, 13, 25, 27, 30, 36, 39],
    [STEPS.addingLeftSortedItem]: [1, 9, 10, 11, 12, 13, 27, 25, 31, 32, 28, 29, 30, 36, 39],
    [STEPS.addedLeftSortedItem]: [1, 9, 10, 11, 12, 13, 27, 25, 31, 32, 28, 29, 30, 36, 39],
    [STEPS.addingRightSortedItem]: [1, 9, 10, 11, 12, 13, 27, 25, 33, 34, 28, 29, 30, 36, 39],
    [STEPS.addedRightSortedItem]: [1, 9, 10, 11, 12, 13, 27, 25, 33, 34, 28, 29, 30, 36, 39],
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