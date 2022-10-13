// handle data for chart display
export const formatChartData = (
  data: number[][]
): { timestamp: number; price: number }[] => {
  return data.map((el) => {
    return {
      timestamp: el[0],
      price: +el[1].toFixed(2),
    }
  })
}

export const formatNumberWithCurrencySymbol = (
  number: number,
  currency: string,
  noFractionDigits: boolean = false
) => {
  const fractionDigits = noFractionDigits ? 0 : undefined
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

export const formatPercentage = (number: number) => {
  const fixedNumber = number.toFixed(2)
  return (
    <div className={number < 0 ? 'negative' : 'positive'}>{fixedNumber}%</div>
  )
}

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString()
}
