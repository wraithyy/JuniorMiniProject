interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMsg?: string;
  options: RadioOption[];
}

export default function FormRadioGroup({
  label,
  id,
  value,
  onChange,
  onBlur,
  errorMsg,
  options,
}: FormRadioGroupProps) {
  return (
    <fieldset className="form-control">
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            checked={value === option.value}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            type="radio"
            value={option.value}
          />
          {option.label}
        </label>
      ))}
      <div className="control-error">{errorMsg && <p>{errorMsg}</p>}</div>
    </fieldset>
  );
}