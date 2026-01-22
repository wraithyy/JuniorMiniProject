export function initOptionalString(root: ParentNode, selector: string) {
    const input = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);

    if (!input) {
        console.warn(`Name input (${selector}) not found.`);
        return () => "";
    }
    return () => input.value.trim();
};

export function initCity(root: ParentNode) {
    return initOptionalString(root, '#city');
}
export function initStreet(root: ParentNode) {
    return initOptionalString(root, '#street');
}
export function initNote(root: ParentNode) {
    return initOptionalString(root, '#note');
}