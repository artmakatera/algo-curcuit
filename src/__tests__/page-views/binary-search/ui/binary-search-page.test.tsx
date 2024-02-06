import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BinarySearchPage} from '@/page-views/binary-search'
 
test('BinarySearchPage', () => {
  render(<BinarySearchPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Binary Search' })).toBeDefined()
})