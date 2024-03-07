
import { StepSnapshot } from './types'

const swap = (arr: number[], swapIndexes: number[]) => {
  const [i, j] = swapIndexes;
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

export function getGoBackSnapshot<S extends StepSnapshot>(snapshot: S): S {
  const arr = [...snapshot.array];
  swap(arr, snapshot.swapIndexes);


  return { ...snapshot, swapIndexes: snapshot.swapIndexes, array: arr }
}