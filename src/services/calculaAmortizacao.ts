import { ParcelasPRICE } from '../types'

export function calculaAmortizacao(parcelasPrice: ParcelasPRICE[], valorMensalParaAmortizar: number, salaryOne: number, salaryTwo: number, emergencyValue: number) {
  const totalParcelas = parcelasPrice.length

  let saldoDevedor = parcelasPrice[0].saldoDevedor

  let jurosAcumulado = 0
  let pagoAcumulado = 0
  let amortizacaoAcumulada = 0

  let parcelasAmortizadas = 0
  let parcelasPagas = 0

  let saldoAmortizacao = 0
  let simulacaoAmortizacao = []

  for (let i = 12; i < parcelasPrice.length; i = i + 12) {
    let parcelasRestantes = totalParcelas - (parcelasPagas + parcelasAmortizadas)
    if (parcelasRestantes <= 0) return simulacaoAmortizacao

    let meses = 0

    for (let j = i - 12; j < i; j++) {
      if (saldoDevedor <= 0) {
        // saldoDevedor = 0
        parcelasRestantes = 0
        break
      }

      //pagamento mensal normal
      pagoAcumulado += parcelasPrice[j].valor
      jurosAcumulado += parcelasPrice[j].juros
      saldoDevedor -= parcelasPrice[j].amortizacao
      meses++
      parcelasPagas++

      //amortizacao
      saldoAmortizacao += valorMensalParaAmortizar
      const amortizacaoMensal = amortizar(parcelasPrice, saldoAmortizacao, totalParcelas - parcelasAmortizadas, parcelasPagas, saldoDevedor)
      saldoAmortizacao = amortizacaoMensal.troco
      parcelasAmortizadas += amortizacaoMensal.quantidade
      amortizacaoAcumulada += amortizacaoMensal.valor
      saldoDevedor -= amortizacaoMensal.valor
    }

    const amortizacao = {
      id: i,
      ano: i / 12,
      meses,
      pagoAcumulado,
      totalPago: pagoAcumulado + amortizacaoAcumulada,
      juros: jurosAcumulado,
      parcelasPagas,
      parcelasAmortizadas,
      parcelasRestantes,
      amortizacaoAcumulada,
      saldoDevedorNormal: parcelasPrice[i].saldoDevedor,
      saldoDevedorAmortizando: saldoDevedor
    }

    simulacaoAmortizacao.push(amortizacao)
  }

  return simulacaoAmortizacao
}

function amortizar(parcelasPrice: ParcelasPRICE[], valorParaAmortizar: number, index: number, mesesPagos: number, saldoDevedor: number) {
  let amortizacaoPaga = 0
  let parcelasAmortizadas = 0

  for (let i = index - 1; i >= 0; i--) {
    if (index <= mesesPagos) {
      if (saldoDevedor > 0) {
        amortizacaoPaga += saldoDevedor
      }
      break
    }
    const valorParcelaAmortizacao = parcelasPrice[i].amortizacao

    if (saldoDevedor <= 0) break
    if (valorParcelaAmortizacao >= saldoDevedor) {
      amortizacaoPaga += saldoDevedor
      break
    }
    if (!(amortizacaoPaga + valorParcelaAmortizacao <= valorParaAmortizar)) break

    saldoDevedor -= valorParcelaAmortizacao
    amortizacaoPaga += valorParcelaAmortizacao
    parcelasAmortizadas++
  }

  const troco = valorParaAmortizar - amortizacaoPaga

  const response = {
    valor: amortizacaoPaga,
    quantidade: parcelasAmortizadas,
    troco
  }

  return response
}
