import type { Contact, ContactsResponse, ContactResponse } from '../types/contact';

const API_BASE_URL = '/api';

export const contactsApi = {
  getAllContacts: async (): Promise<Contact[]> => {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data: ContactsResponse = await response.json();
    return data.data;
  },

  getContact: async (id: string): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact');
    }
    const data: ContactResponse = await response.json();
    return data.data;
  },

  createContact: async (contact: Omit<Contact, '_id' | 'create_date'>): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to create contact');
    }
    const data: ContactResponse = await response.json();
    return data.data;
  },

  updateContact: async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    const data: ContactResponse = await response.json();
    return data.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  },
};
