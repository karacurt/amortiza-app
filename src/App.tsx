import { Form } from './pages/form'
import * as React from 'react'

export default function FormPropsTextFields() {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <Form />
    </div>
  )
}
