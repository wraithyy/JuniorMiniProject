import * as z from 'zod'; 
 
export default z.object({
  firstName: z.string('Zadejte platný řetězec').min(1, 'Zadejte své jméno'),
  lastName: z.string('Zadejte platný řetězec').min(1, 'Zadejte své příjmení'),
  email: z.email('Zadejte platný email'),
  gender: z.string('Zadejte platný řetězec').nullish(),
  phone: z.string('Zadejte platný řetězec')
  .trim().regex(/^\+?\d{9,15}$/, 'Zadejte platné telefonní číslo')
  .nullish().or(z.literal('')),
  note: z.string('Zadejte platný řetězec').nullish(),
  city: z.string('Zadejte platný řetězec').nullish(),
  street: z.string('Zadejte platný řetězec').nullish(),
  houseNumber: z.string('Zadejte platný řetězec').nullish(),
  zipCode: z.preprocess(
    value =>  !value && value !== 0 ? null : Number(value), z.number('Zadejte platné číslo')
      .int('Zadejte platné číslo')
      .min(10000, 'Délka ZIP musí být 5 znaků')
      .max(99999, 'Délka ZIP musí být 5 znaků')
      .nullish()
  ),
  birthDate: z.string('Zadejte platný řetězec').nullish(),
});