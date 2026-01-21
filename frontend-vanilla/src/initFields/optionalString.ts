export function initOptionalString(selector: string) {
    const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);

    if (!input) {
        console.warn(`Name input (${selector}) not found.`);
        return () => "";
    }
    return () => input.value.trim();
};

export function initCity() {
    return initOptionalString('#city');
}
export function initStreet() {
    return initOptionalString('#street');
}
export function initNote() {
    return initOptionalString('#note');
}