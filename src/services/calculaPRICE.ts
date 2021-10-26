export function calculaPRICE(valorFinanciado: number, jurosAnual: number, parcelas: number) {
  const jurosMensal = jurosAnual / 100 / 12
  console.log(valorFinanciado, jurosAnual, jurosMensal, parcelas)

  const pot = Math.pow(1 + jurosMensal, parcelas)

  const valorParcela = valorFinanciado * ((pot * jurosMensal) / (pot - 1))

  let parcelasPRICE = []
  let saldoDevedor = valorFinanciado
  for (let i = 0; i < parcelas; i++) {
    const juros = saldoDevedor * jurosMensal
    const amortizacao = valorParcela - juros
    /*  const parcela = {
      id: i + 1,
      numero: i + 1,
      valor: `R$ ${valorParcela.toFixed(2)}`,
      amortizacao: `R$ ${amortizacao.toFixed(2)}`,
      saldoDevedor: `R$ ${saldoDevedor.toFixed(2)}`,
      juros: `R$ ${juros.toFixed(2)}`
    }*/
    const parcela = {
      id: i + 1,
      numero: i + 1,
      valor: valorParcela,
      amortizacao: amortizacao,
      saldoDevedor: saldoDevedor,
      juros: juros
    }
    parcelasPRICE.push(parcela)
    saldoDevedor = saldoDevedor - amortizacao
  }

  return parcelasPRICE
}
