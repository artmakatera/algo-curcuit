import { LANGUAGES, STEPS } from "../../constants";



const code = `class BubbleSort {
    public int[] sort(int[] nums) {
        int sortIndex = nums.length;

        while(sortIndex > 0) {
            for(int i = 1; i < sortIndex; i++) {
                if (nums[i] < nums[i - 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = temp;
                }
            }
            sortIndex--;
        }

        return nums;
    }
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [3],
  [STEPS.compare]: [5, 6, 12, 14],
  [STEPS.swap]: [5, 6, 7, 8, 9, 10, 11, 12],
  [STEPS.sortedIndex]: [13],
  [STEPS.end]: [16]

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.java,
}

export default model;