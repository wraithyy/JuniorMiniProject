import * as z from 'zod'; 
 
export default z.object({
  firstName: z.string('Zadejte platný řetězec').min(1, 'Zadejte své jméno'),
  lastName: z.string('Zadejte platný řetězec').min(1, 'Zadejte své příjmení'),
  email: z.email('Zadejte platný email'),
  gender: z.string('Zadejte platný řetězec').nullable(),
  phone: z.string('Zadejte platný řetězec')
  .trim().regex(/^\+?\d{9,15}$/, 'Zadejte platné telefonní číslo')
  .nullable().or(z.literal('')),
  note: z.string('Zadejte platný řetězec').nullable(),
  city: z.string('Zadejte platný řetězec').nullable(),
  street: z.string('Zadejte platný řetězec').nullable(),
  houseNumber: z.string('Zadejte platný řetězec').nullable(),
  zipCode: z.preprocess(
    value =>  !value && value !== 0 ? null : Number(value), z.number('Zadejte platné číslo')
      .int('Zadejte platné číslo')
      .min(10000, 'Délka ZIP musí být 5 znaků')
      .max(99999, 'Délka ZIP musí být 5 znaků')
      .nullable()
  ),
  birthDate: z.string('Zadejte platný řetězec').nullable(),
});