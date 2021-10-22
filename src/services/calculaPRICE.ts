export function calculaPRICE(financing: number, fees: number, parcelas: number) {
  const feesByMonth = fees / 12
  console.log(financing, fees, parcelas)
  const parcelaValue = financing * ((Math.pow(1 + feesByMonth, parcelas) * feesByMonth) / (Math.pow(1 + feesByMonth, parcelas) - 1))
  console.log('parcelaValue')
  console.log(parcelaValue)
}
