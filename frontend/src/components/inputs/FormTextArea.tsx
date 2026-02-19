import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type FormTextAreaProps<T extends FieldValues> = Omit<
  {
    label: string;
    field: ControllerRenderProps<T, Path<T>>;
    errorMsg?: string;
  } & React.ComponentProps<"textarea">,
  "value" | "onChange" | "onBlur" | "name"
>;

export default function FormTextArea<T extends FieldValues>({
  label,
  field,
  errorMsg,
  ...props
}: FormTextAreaProps<T>) {
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <textarea
        className="form-control"
        id={field.name}
        {...props}
        {...field}
      />
      <div className="control-error">{errorMsg && <p>{errorMsg}</p>}</div>
    </div>
  );
}
