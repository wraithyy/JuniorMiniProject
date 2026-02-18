import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur" | "name"
> & {
  label: string;
  id: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
};

export default function FormInput<TFieldValues extends FieldValues>({
  label,
  id,
  register,
  error,
  ...props
}: FormInputProps<TFieldValues>) {
  const requiredAsterisk = props.required ? <span>*</span> : null;

  return (
    <div>
      <label htmlFor={id}>
        {label} {requiredAsterisk}
      </label>
      <input className="form-control" id={id} {...props} {...register(id)} />
      {error?.message && <p className="control-error">{error.message}</p>}
    </div>
  );
}
