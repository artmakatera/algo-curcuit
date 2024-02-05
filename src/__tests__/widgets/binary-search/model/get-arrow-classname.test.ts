
import { getArrowClassName } from "@/widgets/binary-search-visualize/model/get-arrow-classname";



import { expect, describe, it } from 'vitest'


describe('getArrowClassName', () => {
 
  it('should return null if compareIndexes are [-1, -1]', () => {
    const compareIndexes = [-1, -1]
    const index = 0
    expect(getArrowClassName(compareIndexes, index)).toBe(null)
  }),

  it('should return null if compareIndexes are the same', () => {
    const compareIndexes = [1, 1]
    const index = 1
    expect(getArrowClassName(compareIndexes, index)).toBe(null)
  })

  it('should return "after:content-["←"]" if compareIndexes[1] === index', () => {
    const compareIndexes = [1, 2]
    const index = 2
    expect(getArrowClassName(compareIndexes, index)).toBe("after:content-['←']")
  })

  it('should return "after:content-["→"]" if compareIndexes[1] !== index', () => {
    const compareIndexes = [1, 2]
    const index = 1
    expect(getArrowClassName(compareIndexes, index)).toBe("after:content-['→']")
  })
})