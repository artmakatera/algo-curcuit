import { LANGUAGES, STEPS } from "../../constants";

const code = `public class MoveZeros {
    public static int[] moveZeros(int[] arr) {
        int slow = 0;
        int fast = 0;
        int n = arr.length;

        while (fast < n) {
            int temp = arr[slow];
            arr[slow] = arr[fast];
            arr[fast] = temp;

            if (arr[fast] != 0) {
                slow++;
            }

            fast++;
        }

        return arr;
    }
}`

export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
    [STEPS.start]: [1, 20, 2, 21, 3, 4, 5],
    [STEPS.check]: [1, 20, 2, 21, 7, 17],
    [STEPS.movePointers]: [1, 20, 2, 21, 7, 17, 8, 9, 10],
    [STEPS.movedPointers]: [1, 20, 2, 21, 7, 17, 8, 9, 10],
    [STEPS.ifStart]: [1, 20, 2, 21, 7, 17, 12, 13, 14],
    [STEPS.ifEnd]: [1, 20, 2, 21, 7, 17, 16],
    [STEPS.found]: [1, 20, 2, 21, 19],
};

const model = {
    code,
    highlightLines,
    language: LANGUAGES.java,
}

export default model;
