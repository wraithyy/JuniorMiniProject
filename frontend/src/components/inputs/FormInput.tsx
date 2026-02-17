import type { FormInputProps } from "../../types/input";
export default function FormInput({
  label,
  id,
  formprops,
  ...props
}: FormInputProps) {
  const { value, handleInputChange, setAsTouched, errorMsg } = formprops;

  const reqiredAsterisk = props.required ? <span>*</span> : null

  return (
    <div>
      <label htmlFor={id}>{label} {reqiredAsterisk}</label>
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
