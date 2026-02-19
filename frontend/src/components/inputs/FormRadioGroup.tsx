import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

type FormRadioGroupProps<T extends FieldValues> = {
  label: string;
  field: ControllerRenderProps<T, Path<T>>;
  errorMsg?: string;
  options: RadioOption[];
} & Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur" | "name"
>;

export default function FormRadioGroup<T extends FieldValues>({
  label,
  field,
  errorMsg,
  options,
  ...props
}: FormRadioGroupProps<T>) {
  return (
    <fieldset className="form-control">
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            {...props}
            {...field}
            checked={field.value === option.value}
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
