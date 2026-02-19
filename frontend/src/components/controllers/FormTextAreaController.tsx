import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import FormTextArea from "../inputs/FormTextArea";

type FormTextAreaControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & Omit<
  React.ComponentProps<"textarea">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormTextAreaController<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormTextAreaControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormTextArea
      errorMsg={fieldState.error?.message}
      field={field}
      label={label}
      {...inputProps}
    />
  );
}
