import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur" | "name"
> & {
  label: string;
  field: ControllerRenderProps<T, Path<T>>;
  errorMsg?: string;
};

export default function FormInput<T extends FieldValues>({
  field,
  label,
  errorMsg,
  ...props
}: FormInputProps<T>) {
  const requiredAsterisk = props.required ? <span>*</span> : null;

  return (
    <div>
      <label htmlFor={field.name}>
        {label} {requiredAsterisk}
      </label>
      <input className="form-control" id={field.name} {...props} {...field} />
      {errorMsg && <p className="control-error">{errorMsg}</p>}
    </div>
  );
}
