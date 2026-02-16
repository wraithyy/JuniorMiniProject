import type { FormTextAreaProps } from "../types/input";
export default function FormTextArea({
  label,
  id,
  formprops,
  ...props
}: FormTextAreaProps) {
  const { value, handleInputChange, setAsTouched, errorMsg } = formprops;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
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
