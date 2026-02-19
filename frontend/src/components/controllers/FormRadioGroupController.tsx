import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import FormRadioGroup from "../inputs/FormRadioGroup";

interface RadioOption {
  value: string;
  label: string;
}

type FormRadioGroupControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: RadioOption[];
} & Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormRadioGroupController<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormRadioGroupControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormRadioGroup<T>
      errorMsg={fieldState.error?.message}
      field={field}
      label={label}
      type="radio"
      {...inputProps}
    />
  );
}
