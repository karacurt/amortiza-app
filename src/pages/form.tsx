import React from 'react'
import { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { calculaPRICE } from '../services/calculaPRICE'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
interface ParcelasPRICE {
  id: number
  numero: number
  valor: string
  amortizacao: string
  juros: string
  saldoDevedor: string
}
export const Form: React.FC = () => {
  const [financing, setFinancing] = useState(0)
  const [salaryOne, setSalaryOne] = useState(0)
  const [salaryTwo, setSalaryTwo] = useState(0)
  const [fees, setFees] = useState(0)
  const [condominiumValue, setCondominiumValue] = useState(0)
  const [emergencyValue, setEmergencyValue] = useState(0)
  const [amortizationValue, setAmortizationValue] = useState(0)
  const [parcelas, setParcelas] = useState(0)
  const [parcelasPRICE, setParcelasPRICE] = useState<ParcelasPRICE[]>([{ id: 0, numero: 0, valor: 'R$ 0,00', juros: 'R$ 0,00', amortizacao: 'R$ 0,00', saldoDevedor: 'R$ 0,00' }])

  console.log(financing, salaryOne, salaryTwo, fees)

  const onClick = () => {
    const result = calculaPRICE(financing, fees, parcelas)
    setParcelasPRICE(result)
    console.log(result)
  }
  const columns: GridColDef[] = [
    { field: 'numero', headerName: 'Nº Parcela', width: 170 },
    { field: 'valor', headerName: 'Valor', width: 130 },
    { field: 'amortizacao', headerName: 'Amortização', width: 170 },
    { field: 'juros', headerName: 'Juros', width: 130 },
    { field: 'saldoDevedor', headerName: 'Saldo Devedor', width: 180 }
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
      <CurrencyTextField
        label='Quantidade de parcelas'
        variant='standard'
        value={parcelas}
        currencySymbol=''
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setParcelas(value)}
      />
      <br />
      <CurrencyTextField
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
      <br />
      <CurrencyTextField
        label='Valor dedicado a amortização mensal'
        variant='standard'
        value={amortizationValue}
        currencySymbol='R$'
        //minimumValue="0"
        outputFormat='number'
        decimalCharacter=','
        digitGroupSeparator='.'
        onChange={(event: Event, value: number) => setAmortizationValue(value)}
      />
      <br />
      <CurrencyTextField
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
      <br />
      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={onClick}>
          Calcular
        </Button>
      </Stack>
      <br />
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={parcelasPRICE} columns={columns} pageSize={100} rowsPerPageOptions={[5]} checkboxSelection />
      </div>
    </>
  )
}
