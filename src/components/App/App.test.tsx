import { render } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

import axe from '../../helpers/axe-helper'

import App from './App'

const mockAxios = jest.fn()
jest.mock('axios', () => ({
  get: () => mockAxios(),
}))

describe('<App />', () => {
  beforeEach(() => {
    window.matchMedia = () =>
      ({
        matches: false,
      } as MediaQueryList)
  })

  it('should not have a11y issues', async () => {
    expect.extend(toHaveNoViolations)
    const { container } = render(<App />)

    const result = await axe(container)

    expect(result).toHaveNoViolations()
  })
})
