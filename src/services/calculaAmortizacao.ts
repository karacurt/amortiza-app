import { convertToObject } from 'typescript'
import { ParcelasPRICE } from '../types'

export function calculaAmortizacao(parcelasPrice: ParcelasPRICE[], amortizationValue: number, salaryOne: number, salaryTwo: number, emergencyValue: number, condominiumValue: number) {
  console.log('calculaAmortizacao')
  console.log(parcelasPrice, salaryOne, salaryTwo, emergencyValue, condominiumValue)

  const condominioAnual = condominiumValue * 12

  let simulacaoAmortizacao = []
  const totalParcelas = parcelasPrice.length - 1
  let parcelasAmortizadas = 0
  const valorAnualAmortizacao = amortizationValue * 12
  console.log('valorAnualAmortizacao', valorAnualAmortizacao)
  let jurosAcumulado = 0
  let pagoAcumulado = 0
  let amortizacaoAcumulada = 0

  for (let i = 12; i < parcelasPrice.length; i = i + 12) {
    if (totalParcelas - (i + parcelasAmortizadas) <= 0) return simulacaoAmortizacao

    let jurosAnual = 0
    let pagoAnual = 0

    for (let j = i - 12; j < i; j++) {
      pagoAnual += parcelasPrice[j].valor
      jurosAnual += parcelasPrice[j].juros
    }
    jurosAcumulado += jurosAnual
    pagoAcumulado += pagoAnual

    console.log('pagoAnual', pagoAnual)
    console.log('jurosAnual', jurosAnual)

    const valorAnualParaAmortizar = valorAnualAmortizacao - pagoAnual - condominioAnual
    console.log('valorAnualParaAmortizar', valorAnualParaAmortizar)

    const quantidadeParcelasAmortizadas = amortizar(parcelasPrice, valorAnualParaAmortizar, totalParcelas - parcelasAmortizadas)
    console.log('quantidadeParcelasAmortizadas', quantidadeParcelasAmortizadas)
    let meses = 12
    if (totalParcelas - (quantidadeParcelasAmortizadas + i + parcelasAmortizadas) <= 0) {
      //let ultimaAmortizacao = totalParcelas - i - parcelasAmortizadas
      console.log('===== ULTIMA AMORTIZACAO =====')
      console.log('ultimaAmortizacao', quantidadeParcelasAmortizadas + i + parcelasAmortizadas)
      console.log('qtd parcelas amortizadas', quantidadeParcelasAmortizadas)
      console.log('i', i)
      console.log('parcelasAmortizadas', parcelasAmortizadas)

      const valorMensalParaAmortizar = amortizationValue - condominiumValue - parcelasPrice[0].valor
      const valorParaQuitar = parcelasPrice[i].saldoDevedor - amortizacaoAcumulada
      console.log('valorMensalParaAmortizar', valorMensalParaAmortizar)
      console.log('valorParaQuitar', valorParaQuitar)
      console.log('pagoAnual', pagoAnual)
      const mesesParaQuitar = (valorParaQuitar - pagoAnual) / valorMensalParaAmortizar
      console.log('mesesParQuitar', mesesParaQuitar)
      meses = mesesParaQuitar

      const quantidadeUltimaAmortizacao = totalParcelas - (i + parcelasAmortizadas)
      amortizacaoAcumulada += valorParaQuitar

      parcelasAmortizadas += quantidadeUltimaAmortizacao + 1
    } else {
      amortizacaoAcumulada += valorAnualParaAmortizar
      parcelasAmortizadas += quantidadeParcelasAmortizadas
    }

    let amortizacao = {
      id: i,
      ano: i / 12,
      meses,
      totalPago: pagoAcumulado,
      juros: jurosAcumulado,
      condominio: condominioAnual * (i / 12),
      parcelasPagas: i,
      parcelasAmortizadas,
      parcelasRestantes: totalParcelas + 1 - (i + parcelasAmortizadas),
      amortizacaoAcumulada,
      saldoDevedorNormal: parcelasPrice[i].saldoDevedor,
      saldoDevedorAmortizando: parcelasPrice[i].saldoDevedor - amortizacaoAcumulada
    }

    simulacaoAmortizacao.push(amortizacao)
    console.log('simulacaoAmortizacao', simulacaoAmortizacao)
  }
  console.log('simulacaoAmortizacao', simulacaoAmortizacao)

  return simulacaoAmortizacao
}

function amortizar(parcelasPrice: ParcelasPRICE[], valorAnualParaAmortizar: number, index: number) {
  let amortizacao = 0
  let parcelasAmortizadas = 0

  for (let i = index; i >= 0; i--) {
    if (amortizacao < valorAnualParaAmortizar) {
      amortizacao += parcelasPrice[i].amortizacao
      parcelasAmortizadas++
    } else {
      break
    }
  }

  return parcelasAmortizadas
}
