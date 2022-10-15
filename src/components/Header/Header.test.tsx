import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toHaveNoViolations } from 'jest-axe'

import CurrencyContext from '../../context/currency'
import axe from '../../helpers/axe-helper'

import Header from './Header'

const renderWithWrapper = (comp: React.ReactElement) =>
  render(comp, {
    wrapper: CurrencyContext,
  })

describe('<Header />', () => {
  it('should not have a11y issues', async () => {
    expect.extend(toHaveNoViolations)
    const { container } = renderWithWrapper(<Header />)

    const result = await axe(container)

    expect(result).toHaveNoViolations()
  })

  it('should render title', async () => {
    renderWithWrapper(<Header />)

    expect(
      screen.getAllByRole('heading', { name: /Crypto Top 5/i })
    ).toHaveLength(1)
  })

  it('should render img with correct src', async () => {
    renderWithWrapper(<Header />)

    const imageElem = screen.getByRole('img')

    expect(imageElem).toBeInTheDocument()
    expect(imageElem).toHaveAttribute('src', '/top5-logo-50px.png')
  })

  it('should render currency menu with usd as default', async () => {
    renderWithWrapper(<Header />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('should render currency menu with usd as default', async () => {
    renderWithWrapper(<Header />)

    userEvent.click(screen.getByRole('button', { name: /USD/i }))
    const eurBtn = await screen.findByRole('menuitem', { name: /EUR/i })
    userEvent.click(eurBtn)

    expect(
      await screen.findByRole('button', { name: /EUR/i })
    ).toBeInTheDocument()
  })
})
