import { LANGUAGES, STEPS } from "../../constants";



const code = `class InsertionSort {
    public int[] sortArray(int[] nums) {
        for(int i = 1; i < nums.length; i++) {
            for(int j = i; j > 0 && nums[j] < nums[j-1]; j--) {
                   int temp = nums[j];
                    nums[j] = nums[j - 1];
                    nums[j - 1] = temp;
            }
        }

        return nums; 
    }
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] }  = {
  // [STEPS.started]: [3, 9],
  // [STEPS.compare]: [4, 8],
  // [STEPS.swap]: [4, 5, 6, 7, 8],
  // [STEPS.sortedIndex]: [11],
  // [STEPS.end]: [11]

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.java,
}

export default model;