import { type FC } from "react";
import "./FieldGroup.scss"
import TextField from '@mui/material/TextField';

interface FieldGroupProps {
  name: string,
  label: string,
  value: string | number | undefined,
  error?: string,
  type?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  required?: boolean
  textarea?: boolean,
}

export const FieldGroup : FC<FieldGroupProps> = ({ name, value, label, required, type, error, textarea, onChange, onBlur }) => {
  return (
    <div className="field-group">
      <TextField type={type ?? 'text'} id={name} label={label} variant="outlined" value={value}
        required={required} name={name} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
        className="text-field" error={!!error} helperText={error ?? ' '}
        multiline={textarea} maxRows={4}
      />
    </div>
  );
}