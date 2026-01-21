
import { z } from 'zod';
import { getErrorElement, debounce } from '../helpers';

// Validate email, update error message, return "isValid" if email passes and "getValue" as a  as a normalized email value
export default function initEmail() {
    // Find the email input in the DOM and bail if it's not present.
    const input = document.querySelector<HTMLInputElement>('#email');

    if (!input) {
        console.warn('Email input (#email) not found.');
        return () => "";
    }


    // Resolve the element where error messages should be displayed using imported helper
    const errorMsg = getErrorElement(input);

    const emailSchema = z.email('Please enter a valid email address');

    // Tracks whether an error is currently shown for UX and resource optimization
    let errorShown = false;

    /**
     * Validates a given string against the email schema.
     * - Updates error message element (if present)
     * - Toggles errorShown flag
     * - Returns true/false depending on validity
     */
    const validate = (value: string) => {
        const result = emailSchema.safeParse(value);
        if (!result.success) {
            const msg = result.error.issues[0]?.message ?? 'Invalid email';
            if (errorMsg) errorMsg.textContent = msg;
            errorShown = true;
            input.setCustomValidity("Invalid email");
            return false;
        }
        if (errorMsg) errorMsg.textContent = '';
        errorShown = false;
        input.setCustomValidity("");
        return true;
    };

    // Helper: validate current input value and update the error display.
    const updateError = () => validate(input.value);

    /**
     * Debounced input handler:
     * Only re-validate while typing if an error is already shown.
     * This makes UX less agressive and lowers unnecessary calls
     */
    const onInput = debounce(() => {
        if (errorShown) updateError();
    });

    // Validate when the user leaves the field.
    input.addEventListener('blur', updateError);
    // Debounced validation while the user types (conditional on existing error).
    input.addEventListener('input', onInput);

    return () => input.value.trim().toLowerCase();

    // const getValue = (): string => {
    //     const val = input.value.trim().toLowerCase();
    //     return emailSchema.safeParse(val).success ? val : "";
    // };
}