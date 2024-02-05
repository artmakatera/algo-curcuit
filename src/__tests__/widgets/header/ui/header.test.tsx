import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header} from '@/widgets/header'
 
test('Page', () => {
  render(<Header />)
  expect(screen.getByText("ALGO_CURCUIT")).toBeDefined()
})