import type { UseInputReturn } from "../../types/input";

type FormTextAreaProps = Omit<
  React.ComponentProps<"textarea">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  formProps: UseInputReturn;
};

export default function FormTextArea({
  label,
  id,
  formProps,
  ...props
}: FormTextAreaProps) {
  const { value, handleInputChange, setAsTouched, errorMsg } = formProps;

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
