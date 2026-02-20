import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

type FormRadioGroupControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: RadioOption[];
} & Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormRadioGroupController<T extends FieldValues>({
  control,
  name,
  label,
  options,
  ...inputProps
}: FormRadioGroupControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <fieldset className="form-control">
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            {...inputProps}
            checked={field.value === option.value}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            ref={field.ref}
            type="radio"
            value={option.value}
          />
          {option.label}
        </label>
      ))}
      <div className="control-error">{fieldState.error && <p>{fieldState.error.message}</p>}</div>
    </fieldset>

  );
}
