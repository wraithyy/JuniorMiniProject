import { type FC } from "react";
import "./FieldGroup.scss"

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
      <label htmlFor={name}>{label}</label>
      {textarea ? 
        <textarea name={name} id={name} className={error ? 'error' : ''}
          required={required}
          value={value} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
        ></textarea>
      :
        <input type={type ?? 'text'} id={name} required={required} name={name} className={error ? 'error' : ''}
          value={value ?? ''} onChange={e => onChange?.(e)} onBlur={e => onBlur?.(e)}
        />
      }
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}