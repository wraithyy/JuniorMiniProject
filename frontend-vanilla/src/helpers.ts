
// Find an .error element close to an input (matches your current layout)
export function getErrorElement(input: HTMLInputElement): HTMLElement | null {
  const wrapper = input.closest('.form-group');
  const el = wrapper?.querySelector('.error') ?? null;
  return el instanceof HTMLElement ? el : null;
}

// Debounce utility to delay validation while typing
// MS Copilot generated, works as expected, but I do not understand it fully yet
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}
