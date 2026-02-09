export function formatDate(date?: string | Date): string {
	if (!date) return "";

	const d = typeof date === "string" ? new Date(date) : date;

	if (Number.isNaN(d.getTime())) return "";

	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export function toDate(value: string | Date | undefined): Date | null {
	if (!value) return null;
	if (value instanceof Date) return value;

	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function shallowEqual<T extends Record<string, any>>(
	a: T,
	b: T,
): boolean {
	const keysA = Object.keys(a) as (keyof T)[];
	const keysB = Object.keys(b) as (keyof T)[];

	return (
		keysA.length === keysB.length && keysA.every((key) => a[key] === b[key])
	);
}
