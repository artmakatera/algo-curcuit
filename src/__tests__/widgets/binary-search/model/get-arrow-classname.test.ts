import { expect, describe, test } from 'vitest'

import { getArrowClassName } from "@/widgets/binary-search-visualize/model/get-arrow-classname";





describe('getArrowClassName', () => {
 
  test('should return null if compareIndexes are [-1, -1]', () => {
    const compareIndexes = [-1, -1]
    const index = 0
    expect(getArrowClassName(compareIndexes, index)).toBe(null)
  }),

  test('should return null if compareIndexes are the same', () => {
    const compareIndexes = [1, 1]
    const index = 1
    expect(getArrowClassName(compareIndexes, index)).toBe(null)
  })

  test('should return "after:content-["←"]" if compareIndexes[1] === index', () => {
    const compareIndexes = [1, 2]
    const index = 2
    expect(getArrowClassName(compareIndexes, index)).toBe("after:content-['←']")
  })

  test('should return "after:content-["→"]" if compareIndexes[1] !== index', () => {
    const compareIndexes = [1, 2]
    const index = 1
    expect(getArrowClassName(compareIndexes, index)).toBe("after:content-['→']")
  })
})