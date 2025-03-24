
export const COMPLEXITIES = {
  O_N: "O(n)",
  O_N_LOG_N: "O(n log n)",
  O_N_SQUARE: "O(n^2)",
  O_LOG_N: "O(log n)",
  O_1: "O(1)",
  O_N_FACTORIAL: "O(n!)",
}

export const COMPLEXITY_BADGE_BACKGROUNDS= {
  [COMPLEXITIES.O_N_SQUARE]: "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
  [COMPLEXITIES.O_N_FACTORIAL]: "bg-red-700 text-white [a&]:hover:bg-red-700/90 focus-visible:ring-red-700/20 dark:focus-visible:ring-red-700/40 dark:bg-red-700/70",
  [COMPLEXITIES.O_N]: "bg-yellow-500 text-white [a&]:hover:bg-yellow-500/90 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40 dark:bg-yellow-500/70",
  [COMPLEXITIES.O_N_LOG_N]: "bg-orange-500 text-white [a&]:hover:bg-orange-500/90 focus-visible:ring-orange-500/20 dark:focus-visible:ring-orange-500/40 dark:bg-orange-500/70",
  [COMPLEXITIES.O_LOG_N]: "bg-green-500 text-white [a&]:hover:bg-green-500/90 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 dark:bg-green-500/70",
  [COMPLEXITIES.O_1]: "bg-green-700 text-white [a&]:hover:bg-green-700/90 focus-visible:ring-green-700/20 dark:focus-visible:ring-green-700/40 dark:bg-green-700/70",
}

export type Complexity = (typeof COMPLEXITIES)[keyof typeof COMPLEXITIES];