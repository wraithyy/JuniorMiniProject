import * as z from 'zod';

export function formatDate(date?: string | Date): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function mapZodErrors<T>(error: z.ZodError<T>): Partial<Record<keyof T, string>> {
    const fieldErrors: Partial<Record<keyof T, string>> = {};

    for (const issue of error.issues) {
      const fieldName = issue.path[0] as keyof T;

      // keep first error per field
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = issue.message;
      }
    }

    return fieldErrors;
  }
