export const getArrowClassName = (compareIndexes: number[], index: number) => {

  if (compareIndexes.every(i => i === -1)) {
    return null
  }

  if (compareIndexes[0] === compareIndexes[1]) {
    return null
  }

  if (compareIndexes[1] === index) {
    return "after:content-['←']"
  }

  return "after:content-['→']"

}