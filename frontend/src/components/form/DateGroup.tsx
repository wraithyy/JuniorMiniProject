import { type FC } from "react";
import "./FieldGroup.scss"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { cs } from 'date-fns/locale';
import { toDate } from "../../helpers";

interface DateGroupProps {
  name: string,
  label: string,
  value: string | Date | undefined,
  error?: string,
  onChange?: (value: string | undefined) => void,
}

export const DateGroup : FC<DateGroupProps> = ({ name, value, label, error, onChange }) => {
  return (
    <div className="field-group">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
        <DatePicker
          label={label}
          value={toDate(value)}
          onChange={(date: Date | null) => {
            onChange?.(
              date ? date.toISOString().slice(0, 10) : undefined
            );
          }}
          slotProps={{
            textField: {
              name,
              error: !!error,
              helperText: error,
              className: 'text-field',
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}