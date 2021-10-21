import * as React from 'react'
import { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
export default function FormPropsTextFields() {
  const [financing, setFinancing] = useState(0)
  const [salaryOne, setSalaryOne] = useState(0)
  const [salaryTwo, setSalaryTwo] = useState(0)
  const [fees, setFees] = useState(0)
  const [condominiumValue, setCondominiumValue] = useState(0)
  const [emergencyValue, setEmergencyValue] = useState(0)
  const [amortizationValue, setAmortizationValue] = useState(0)

  console.log(financing, salaryOne, salaryTwo, fees)

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
    </>
  )
}
