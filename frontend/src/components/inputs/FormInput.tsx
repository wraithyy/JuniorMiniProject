import type { UseFormRegister } from "react-hook-form";

type FormInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error: FieldErrors;
  
  
};
export default function FormInput({
  label,
  id,
  register,
  error,
  ...props
}: FormInputProps) {

  const reqiredAsterisk = props.required ? <span>*</span> : null;

  return (
    <div>
      <label htmlFor={id}>
        {label} {reqiredAsterisk}
      </label>
      <input
        className="form-control"
        id={id}
        {...props}
        {...register(id)}
      />
      <div className="control-error">  {error && <p className="control-error">{error.message}</p>}</div>
    </div>
  );
}
