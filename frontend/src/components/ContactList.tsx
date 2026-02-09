import {useEffect, useState} from 'react';
import type { Contact } from '../types/contact';
import {contactsApi} from "../api/contactsApi.ts";

type ContactListProps = {
  onContactSelect: (contact: Contact) => void;
  selectedContact: Contact | null;
}

export const ContactList = ({ onContactSelect }: ContactListProps) => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function load() {
            const result = await contactsApi.getAllContacts();
            setContacts(result);
            setIsLoading(false)

        }
        load();

    }, []);


    return (
    <div>
      <h2>List of Contacts</h2>
        {
        isLoading ? "Loading..." :
        contacts.length === 0 ? "There are no contacts here." :
            (
                contacts.map(contact => (
                    <div key={contact._id}>
                        <div className={"contact-name"} onClick={() => onContactSelect(contact)} >
                            {contact.firstName} {contact.lastName}
                        </div>
                    </div>
            )))
        }
    </div>
  );
};
