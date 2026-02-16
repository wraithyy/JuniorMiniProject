import type { UseInputReturn } from "../../types/input";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  id: string;
  label: string;
  name: string;
  options: RadioOption[];
  formProps: UseInputReturn;
}

export default function FormRadioGroup({
  label,
  name,
  options,
  formProps,
}: FormRadioGroupProps) {
  const { value, handleInputChange, setAsTouched, errorMsg } = formProps;
  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            checked={value === option.value}
            name={name}
            onBlur={setAsTouched}
            onChange={handleInputChange}
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
