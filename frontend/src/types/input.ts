export interface UseInputReturn {
    value: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputBlur: () => void;
    errorMsg: string;
}

export type FormInputProps =
    Omit<React.ComponentProps<'input'>, "value" | "onChange" | "onBlur"> & {
        label: string;
        id: string;
        hook: UseInputReturn;
    };