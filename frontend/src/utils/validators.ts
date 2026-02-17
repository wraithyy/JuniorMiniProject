import { z } from "zod";

const nineDigits = /^\d{9}$/;
const fiveDigits = /^\d{5}$/;
const houseNumberRegex = /^(\d+(?:[ /-]\d+[A-Za-z]?)?)?$/;

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      nineDigits.test(value) ||
      z.e164().safeParse(value).success,
    { message: "Číslo musí být ve formátu E.164 (+420...) nebo mít 9 cifer." }
  );

const zipCodeSchema = z
  .string()
  .trim()
  .refine((value) => value === "" || fiveDigits.test(value), {
    message: "PSČ musí mít 5 číslic",
  });

const houseNumberSchema = z
  .string()
  .trim()
  .regex(houseNumberRegex, "Použijte formáty jako 123, 123/7, 123-7a");

const nonEmptySchema = z.string().min(1, "Pole je povinné");

const textSchema = z.string("Zadejte textový vstup");

export const formSchema = z.object({
  firstName: nonEmptySchema,
  lastName: nonEmptySchema,
  email: z.email("Zadejte platný e-mail"),
  phone: phoneSchema,
  zipCode: zipCodeSchema,
  houseNumber: houseNumberSchema,
  note: textSchema,
  gender: textSchema,
  city: textSchema,
  street: textSchema,
  birthDate: textSchema
});

   