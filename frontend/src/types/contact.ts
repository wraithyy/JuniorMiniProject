export interface Contact {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string | null;
  phone?: string | null;
  note?: string | null;
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  zipCode?: number | null;
  birthDate?: Date | string | null;
  create_date?: Date | string | null;
}

export interface ContactsResponse {
  status: string;
  message: string;
  data: Contact[];
}

export interface ContactResponse {
  status?: string;
  message: string;
  data: Contact;
}

export type OnContactSelect = (contact: Contact) => void;


