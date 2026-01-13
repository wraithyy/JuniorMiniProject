import type { FieldAdapter } from "./types";

export default function initGenderField(): FieldAdapter {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[name="gender"]')

    if (!inputs.length) {
        console.warn("Gender radio buttons not found.");
        return {
            isValid: () => false,
            getValue: () => '',
        };
    }

    const isValid = (): boolean => {
        return Array.from(inputs).some(input => input.checked)
    };
    const getValue = (): string => {
        const selected = Array.from(inputs).find(input => input.checked)
        return selected ? selected.value : "";
    }
    return {isValid, getValue};
}