import { LANGUAGES } from "../constants";



const code = `public class MergeSort {
  public static int[] mergeSort(int[] array) {
    if (array.length <= 1) {
      return array;
    }

    int mid = array.length / 2;
    int[] left = new int[mid];
    int[] right = new int[array.length - mid];

    System.arraycopy(array, 0, left, 0, mid);
    System.arraycopy(array, mid, right, 0, array.length - mid);

    return merge(mergeSort(left), mergeSort(right));
  }

  private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result[k++] = left[i++];
      } else {
        result[k++] = right[j++];
      }
    }

    while (i < left.length) {
      result[k++] = left[i++];
    }

    while (j < right.length) {
      result[k++] = right[j++];
    }

    return result;
  }
}`



export const highlightLines: { [key in STEPS]?: number[] } = {
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