import { LANGUAGES, STEPS } from "../../constants";



const code = `class TwoSumSorted {
    public static int[] twoSumSorted(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            if (arr[left] + arr[right] == target) {
                return new int[]{left, right};
            }

            if (arr[left] + arr[right] < target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{};
    }
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
    [STEPS.start]: [1, 2, 19, 20, 3, 4],
    [STEPS.ifStart]: [1, 2, 19, 20, 6, 16, 11, 12, 13],
    [STEPS.ifEnd]: [1, 2, 19, 20, 13, 14, 15],
    [STEPS.found]: [1, 2, 19, 20, 7, 8, 9],
    [STEPS.notFound]: [1, 2, 19, 20, 18],
};


const model = {
    code,
    highlightLines,
    language: LANGUAGES.java,
}

export default model;