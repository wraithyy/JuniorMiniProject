import { type FC } from "react";
import "./FieldGroup.scss"
import Radio from '@mui/material/Radio';
import Group from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioItem {
  value: string,
  label: string,
}

interface RadioGroupProps {
  name: string,
  label: string,
  value: string | number | undefined,
  error?: string,
  items: RadioItem[],
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  required?: boolean
}

export const RadioGroup : FC<RadioGroupProps> = ({ value, name, label, items, error, onChange }) => {

  return (
    <FormControl error={!!error}>
      <FormLabel id={name}>{label}</FormLabel>
      <Group
        aria-labelledby={name}
        value={value}
        name={name} onChange={e => onChange?.(e)}
      >
        {items.map(({ value, label }) => (
          <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
        ))}
      </Group>
    </FormControl>
  );
}