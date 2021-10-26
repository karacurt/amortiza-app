import React from 'react'
import { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { calculaPRICE } from '../services/calculaPRICE'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { ParcelasPRICE } from '../types'
import { calculaAmortizacao } from '../services/calculaAmortizacao'

export const Form: React.FC = () => {
  const [financing, setFinancing] = useState(0)
  const [salaryOne, setSalaryOne] = useState(0)
  const [salaryTwo, setSalaryTwo] = useState(0)
  const [fees, setFees] = useState(0)
  const [condominiumValue, setCondominiumValue] = useState(0)
  const [emergencyValue, setEmergencyValue] = useState(0)
  const [amortizationValue, setAmortizationValue] = useState(0)
  const [parcelas, setParcelas] = useState(0)
  const [parcelasPRICE, setParcelasPRICE] = useState<ParcelasPRICE[]>([{ id: 0, numero: 0, valor: 0, juros: 0, amortizacao: 0, saldoDevedor: 0 }])
  const [amortizationTable, setAmortizationTableValue] = useState([] as any)
  const [totalGeralPago, setTotalGeralPago] = useState(0)
  const [tempoParaQuitar, setTempoParaQuitar] = useState(0)
  const [mesesParaQuitar, setMesesParaQuitar] = useState(0)

  console.log(financing, salaryOne, salaryTwo, fees)

  /* const getPriceTable = () => {
    const result = calculaPRICE(financing, fees, parcelas)
    setParcelasPRICE(result)
    console.log(result)
  }*/
  const getAmortizationTable = () => {
    const parcelasPriceSimulacao = calculaPRICE(financing, fees, parcelas)
    setParcelasPRICE(parcelasPriceSimulacao)
    const simulacao = calculaAmortizacao(parcelasPriceSimulacao, amortizationValue, salaryOne, salaryTwo, emergencyValue)
    setAmortizationTableValue(simulacao)
    const lastIndex = simulacao.length - 1

    setTempoParaQuitar(simulacao[lastIndex].ano)
    setMesesParaQuitar(simulacao[lastIndex].meses)
    setTotalGeralPago(simulacao[lastIndex].totalPago)
  }
  /* const columnsPrice: GridColDef[] = [
    { field: 'numero', headerName: 'Nº Parcela', width: 170 },
    { field: 'valor', headerName: 'Valor', width: 130 },
    { field: 'amortizacao', headerName: 'Amortização', width: 170 },
    { field: 'juros', headerName: 'Juros', width: 130 },
    { field: 'saldoDevedor', headerName: 'Saldo Devedor', width: 180 }
  ]*/
  const columnsAmortization: GridColDef[] = [
    { field: 'ano', headerName: 'Ano', width: 110 },
    { field: 'totalPago', headerName: 'Total Pago', width: 170 },
    { field: 'juros', headerName: 'Juros Pago', width: 170 },
    { field: 'parcelasPagas', headerName: 'Parcelas Pagas', width: 190 },
    { field: 'parcelasAmortizadas', headerName: 'Parcelas amortizadas', width: 230 },
    { field: 'parcelasRestantes', headerName: 'Prazo (meses)', width: 180 },
    { field: 'amortizacaoAcumulada', headerName: 'Fundo p/ amortizar', width: 180 },
    { field: 'saldoDevedorNormal', headerName: 'Saldo normal', width: 180 },
    { field: 'saldoDevedorAmortizando', headerName: 'Saldo amortizando', width: 180 }
  ]

  return (
    <>
      <CurrencyTextField
        label='Valor financiamento'
        variant='standard'
        value={financing}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setFinancing(value)}
      />
      <br />
      <CurrencyTextField
        label='Juros a.a'
        variant='standard'
        value={fees}
        currencySymbol='%'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setFees(value)}
      />
      <br />
      <CurrencyTextField label='Quantidade de parcelas' variant='standard' value={parcelas} currencySymbol='' minimumValue='360' outputFormat='number' decimalCharacter=',' digitGroupSeparator='.' onChange={(event: Event, value: number) => setParcelas(value)} />
      <br />
      {/* <CurrencyTextField
        label='Salario Líquido 1'
        variant='standard'
        value={salaryOne}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setSalaryOne(value)}
      />
      <br />
      <CurrencyTextField
        label='Salario Líquido 2'
        variant='standard'
        value={salaryTwo}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setSalaryTwo(value)}
      />
      <br />*/}
      <CurrencyTextField label='Valor dedicado a amortização mensal' variant='standard' value={amortizationValue} currencySymbol='R$' minimumValue='0' outputFormat='number' decimalCharacter=',' digitGroupSeparator='.' onChange={(event: Event, value: number) => setAmortizationValue(value)} />
      <br />
      {/*<CurrencyTextField
        label='Reserva mensal para emergências'
        variant='standard'
        value={emergencyValue}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setEmergencyValue(value)}
      />
      <br />
      <CurrencyTextField
        label='Previsão valor do condomínio'
        variant='standard'
        value={condominiumValue}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setCondominiumValue(value)}
      />
        <br />*/}

      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={getAmortizationTable}>
          Simular Amortização
        </Button>
      </Stack>
      <br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={amortizationTable} columns={columnsAmortization} pageSize={100} rowsPerPageOptions={[5]} checkboxSelection />
      </div>
      <h3>
        Total Geral pago: R$ {totalGeralPago.toFixed(2)}
        <br />
        Tempo para quitar : {mesesParaQuitar < 12 ? `${tempoParaQuitar} anos e ${mesesParaQuitar.toFixed(0)} meses` : `${(tempoParaQuitar + 1).toFixed(0)} anos`}
      </h3>
      {/* <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={parcelasPRICE} columns={columnsPrice} pageSize={100} rowsPerPageOptions={[5]} checkboxSelection />
  </div>*/}
    </>
  )
}
