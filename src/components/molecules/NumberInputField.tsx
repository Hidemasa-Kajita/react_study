import { ChangeEvent, VFC } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { SxProps } from '@mui/system'

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
})

type Props = {
  sx?: SxProps
  label: string
  value: number | undefined | null
  required: boolean
  handle: (e: ChangeEvent<HTMLInputElement>) => void
}

const NumberInputField: VFC<Props> = ({
  sx,
  label,
  value,
  required,
  handle,
}) => (
  <FormControl variant="standard" sx={sx}>
    <ValidationTextField
      variant="outlined"
      label={label}
      value={value ?? 0}
      required={required}
      onChange={handle}
    />
  </FormControl>
)

export default NumberInputField
