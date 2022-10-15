import { render, screen } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

import axe from '../../helpers/axe-helper'

import Footer from './Footer'

describe('<Footer />', () => {
  it('should not have a11y issues', async () => {
    expect.extend(toHaveNoViolations)
    const { container } = render(<Footer />)

    const result = await axe(container)

    expect(result).toHaveNoViolations()
  })

  it('should render footer', async () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should render email link', async () => {
    render(<Footer />)
    const linkElem = screen.getByRole('link')

    expect(linkElem).toBeInTheDocument()
    expect(linkElem).toHaveAttribute('href', 'mailto:marcos32m@example.com')
  })
})
