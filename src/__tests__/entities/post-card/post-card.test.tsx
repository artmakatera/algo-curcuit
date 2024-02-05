import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard} from '@/entities/post-card'
 
test('Page', () => {
  render(<PostCard />)
  expect(screen.getByRole('heading', { level: 3, name: 'Binary Search' })).toBeDefined()
})