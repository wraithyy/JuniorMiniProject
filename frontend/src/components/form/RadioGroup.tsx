import { type FC } from "react";
import "./FieldGroup.scss"

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
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  required?: boolean
}

export const RadioGroup : FC<RadioGroupProps> = ({ value, name, label, items, error, onChange, onBlur }) => {

  return (
    <div className="field-group grow radio-group">
      <p>{label}</p>

      {items.map(i => (
        <span key={i.value}>
          <label htmlFor={i.value}>{i.label}</label>
          <input type="radio" name="gender" id={i.value} checked={i.value === value}
            value={i.value} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
          />
        </span>
      ))}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}