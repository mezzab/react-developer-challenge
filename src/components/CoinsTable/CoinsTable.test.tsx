import { ToastContainer } from 'react-toastify'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toHaveNoViolations } from 'jest-axe'

import CurrencyContext from '../../context/currency'
import SelectedCoinContext from '../../context/selectedCoin'
import axe from '../../helpers/axe-helper'

import CoinsTable, { columns } from './CoinsTable'

const mockAxios = jest.fn()
jest.mock('axios', () => ({
  get: () => mockAxios(),
}))

const MOCK_COINS_INFO = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 19168.88,
    market_cap: 367610229705,
    price_change_percentage_24h: 0.235,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 1297.31,
    market_cap: 156927021250,
    price_change_percentage_24h: 0.7024,
  },
]

const renderWithWrapper = (comp: React.ReactElement) =>
  render(comp, {
    wrapper: ({ children }) => (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <CurrencyContext>
          <SelectedCoinContext>{children}</SelectedCoinContext>
        </CurrencyContext>
      </>
    ),
  })

describe('<CoinsTable />', () => {
  beforeEach(() => {
    mockAxios.mockImplementation(() => ({ status: 200, data: MOCK_COINS_INFO }))
    jest.clearAllMocks()
    window.matchMedia = () =>
      ({
        matches: true,
      } as any)
  })

  it('should not have a11y issues', async () => {
    expect.extend(toHaveNoViolations)

    const { container } = renderWithWrapper(<CoinsTable />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })

  it('should render progress bar', async () => {
    renderWithWrapper(<CoinsTable />)

    expect(await screen.findByRole('progressbar')).toBeInTheDocument()
  })

  it('should render fetched content', async () => {
    renderWithWrapper(<CoinsTable />)

    await waitFor(async () => {
      expect(await screen.findByRole('table')).toBeInTheDocument()
      expect(
        await screen.findByText(MOCK_COINS_INFO[0].name)
      ).toBeInTheDocument()
      expect(
        await screen.findByText(MOCK_COINS_INFO[1].name)
      ).toBeInTheDocument()
    })
  })

  it('should render all columns', async () => {
    renderWithWrapper(<CoinsTable />)

    await waitFor(async () => {
      expect(await screen.findByText(columns[0].label)).toBeInTheDocument()
      expect(await screen.findByText(columns[1].label)).toBeInTheDocument()
      expect(await screen.findByText(columns[2].label)).toBeInTheDocument()
      expect(await screen.findByText(columns[3].label)).toBeInTheDocument()
    })
  })

  it('should not render all columns if mobile', async () => {
    window.matchMedia = () =>
      ({
        matches: false,
      } as any)
    const { container } = renderWithWrapper(<CoinsTable />)
    await waitFor(async () => {
      const marketCapCol = screen.queryByText(columns[2].label)
      const percChange24hCol = screen.queryByText(columns[3].label)
      expect(marketCapCol).toBeNull()
      expect(percChange24hCol).toBeNull()
    })
  })

  it('should select a row on onClick', async () => {
    const secondCryptoId = MOCK_COINS_INFO[1].id
    renderWithWrapper(<CoinsTable />)

    await waitFor(async () => {
      const secondRow = await screen.findByTestId(secondCryptoId)
      userEvent.click(secondRow)

      const updatedSecondRow = await screen.findByTestId(secondCryptoId)
      expect(updatedSecondRow).toHaveClass('Mui-selected')
    })
  })

  it('should select a row on onClick', async () => {
    const statusText = 'Internal Server Error'
    mockAxios.mockImplementation(() => ({ status: 500, statusText }))

    renderWithWrapper(<CoinsTable />)

    await waitFor(async () => {
      const toastAlertError = await screen.findByText(`Error: ${statusText}`)
      expect(toastAlertError).toBeInTheDocument()
    })
  })
})
