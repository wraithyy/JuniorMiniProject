import { type FC } from "react";
import "./FieldGroup.scss"
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { csCZ } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/cs';

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
      {textarea ? 
        <textarea name={name} id={name} className={error ? 'error' : ''}
          required={required}
          value={value} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
        ></textarea>
      : type === 'date' ?
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs"
          localeText={csCZ.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          <DatePicker label={label} 
            name={name} onChange={e => onChange?.(e)}
            className="text-field"
          />
        </LocalizationProvider>
      :
        <TextField type={type ?? 'text'} id={name} label={label} variant="outlined" 
          required={required} name={name} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
          className="text-field" error={!!error} helperText={error ?? ' '}
        />
      }
    </div>
  );
}