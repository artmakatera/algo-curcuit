import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard} from '@/entities/post-card'
 
test('Page', () => {
  const title = 'Binary Search'
  render(<PostCard title={title} link="/s" description='' />)
  expect(screen.getByRole('heading', { level: 3, name: title })).toBeDefined()
})