import { LANGUAGES, STEPS } from "../..";

export const code = `class BinarySearchInRotatedArray {
    public int search(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;

        while(start <= end) {
            int middleIndex = (start + end) / 2;

            if (nums[middleIndex] == target) {
                return middleIndex;
            } else if (nums[middleIndex] >= nums[start]) {
                if (target >= nums[start] && target < nums[middleIndex]) {
                    end = middleIndex - 1;
                } else {
                    start = middleIndex + 1;
                }
            } else {
                if (target <= nums[end] && target > nums[middleIndex]) {
                    start = middleIndex + 1;
                } else {
                    end = middleIndex - 1;
                }
            }
        }

        return -1;
    }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [3, 4],
  [STEPS.middleIndex]: [6, 7, 24],
  [STEPS.ifStart]: [6, 11, 12, 13, 14, 15, 16, 17, 24],
  [STEPS.ifEnd]: [6, 17, 18, 19, 20, 21, 22, 23, 24],
  [STEPS.ifStartSorted]: [6, 11, 12, 13, 14, 24],
  [STEPS.ifStartNotSorted]: [14, 15, 16],
  [STEPS.ifEndSorted]: [6, 17, 18, 19, 20, 23, 24],
  [STEPS.ifEndNotSorted]: [6, 20, 21, 22],
  [STEPS.result]: [9, 10, 11],
  [STEPS.notFound]: [26]
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;