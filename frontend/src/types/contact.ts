export interface Contact {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  phone?: string;
  note?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: number;
  birthDate?: Date | string;
  create_date?: Date | string;
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
