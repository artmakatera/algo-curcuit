import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomePage } from '@/page-views/home'

 
test('HomePage', () => {
  render(<HomePage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Explore Algorithms' })).toBeDefined()
})