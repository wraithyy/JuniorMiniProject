type FormTextAreaProps = Omit<
  React.ComponentProps<"textarea">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  errorMsg?: string;
};

export default function FormTextArea({
  label,
  id,
  value,
  onChange,
  onBlur,
  errorMsg,
  ...props
}: FormTextAreaProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        className="form-control"
        id={id}
        {...props}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />
      <div className="control-error">{errorMsg && <p>{errorMsg}</p>}</div>
    </div>
  );
}
