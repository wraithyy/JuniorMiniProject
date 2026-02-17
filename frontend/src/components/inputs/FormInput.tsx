import type { UseInputReturn } from "../../types/input";

type FormInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  formProps: UseInputReturn;
};
export default function FormInput({
  label,
  id,
  formProps,
  ...props
}: FormInputProps) {
  const { value, handleInputChange, setAsTouched, errorMsg } = formProps;

  const reqiredAsterisk = props.required ? <span>*</span> : null;

  return (
    <div>
      <label htmlFor={id}>
        {label} {reqiredAsterisk}
      </label>
      <input
        className="form-control"
        id={id}
        onBlur={setAsTouched}
        onChange={handleInputChange}
        value={value}
        {...props}
      />
      <div className="control-error">{errorMsg && <p>{errorMsg}</p>}</div>
    </div>
  );
}
