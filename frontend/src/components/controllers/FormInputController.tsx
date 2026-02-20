import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

type FormInputControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormInputController<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  ...inputProps
}: FormInputControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  const requiredAsterisk = inputProps.required ? <span>*</span> : null;
  return (
    <div>
      <label htmlFor={field.name}>
        {label} {requiredAsterisk}
      </label>
      <input className="form-control" id={field.name} type={type} {...inputProps} {...field} />
      {fieldState.error && <p className="control-error">{fieldState.error.message}</p>}
    </div>
  );
}
