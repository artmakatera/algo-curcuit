export const COMPARING = "text-white bg-blue-500"
export const SWAPPING = "text-white bg-red-500"
export const CHECKING = "text-white bg-yellow-500"
export const SORTED = "text-white bg-green-500"

export const COMPARE_CLASSES = { COMPARING, SWAPPING, SORTED, CHECKING }

type ValueOf<T> = T[keyof T];

export type CompareClass = ValueOf<typeof COMPARE_CLASSES>


export const SORTED_ARRAY_LEGEND = [
  { label: "Comparing", colorClassName: COMPARE_CLASSES.COMPARING },
  { label: "Swapping", colorClassName: COMPARE_CLASSES.SWAPPING },
  { label: "Sorted", colorClassName: COMPARE_CLASSES.SORTED },
]