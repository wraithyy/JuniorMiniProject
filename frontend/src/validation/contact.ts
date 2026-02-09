import { type ZodType, z } from "zod";

const strginError = "Zadejte platný řetězec";

export const contactSchema = z.object({
	firstName: z.string(strginError).min(1, "Zadejte své jméno"),
	lastName: z.string(strginError).min(1, "Zadejte své příjmení"),
	email: z.email("Zadejte platný email"),
	gender: z.string(strginError).nullish(),
	phone: z
		.string(strginError)
		.trim()
		.regex(/^\+?\d{9,15}$/, "Zadejte platné telefonní číslo")
		.nullish()
		.or(z.literal("")),
	note: z.string(strginError).nullish(),
	city: z.string(strginError).nullish(),
	street: z.string(strginError).nullish(),
	houseNumber: z.string(strginError).nullish(),
	zipCode: z.preprocess(
		(value) => (!value && value !== 0 ? null : Number(value)),
		z
			.number("Zadejte platné číslo")
			.int("Zadejte platné číslo")
			.min(10000, "Délka ZIP musí být 5 znaků")
			.max(99999, "Délka ZIP musí být 5 znaků")
			.nullish(),
	),
	birthDate: z.string(strginError).nullish(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function zodBlurValidator<T extends ZodType>(schema: T) {
	return ({ value }: { value: unknown }) => {
		const result = schema.safeParse(value);
		return result.success ? undefined : result.error.issues[0].message;
	};
}
