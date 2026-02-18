type FormInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMsg?: string;
};

export default function FormInput({
  label,
  id,
  value,
  onChange,
  onBlur,
  errorMsg,
  ...props
}: FormInputProps) {
  const requiredAsterisk = props.required ? <span>*</span> : null;

  return (
    <div>
      <label htmlFor={id}>
        {label} {requiredAsterisk}
      </label>
      <input
        className="form-control"
        id={id}
        {...props}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />
      {errorMsg && <p className="control-error">{errorMsg}</p>}
    </div>
  );
}
