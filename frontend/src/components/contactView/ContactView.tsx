import type { Dispatch, SetStateAction } from "react";
import { useGetAllContacts } from "../../hooks/fetching/useGetAllContacts";
import { ContactDetail } from "./ContactDetail";
import ContactList  from "./ContactList";
import type { Contact } from "../../types/contact";
import type {  Page } from "../../types/page";

interface ContactViewProps{
  setCurrentPage: Dispatch<SetStateAction<Page>>;
  selectedContact: Contact | null;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}

export default function ContactView({
  selectedContact,
  setSelectedContact,
  setCurrentPage,
}: ContactViewProps) {
  const { contacts, setContacts, error, isFetching } = useGetAllContacts();

  return (
    <div className="list-view">
      <div className="list-panel">
        <ContactList
          contacts={contacts}
          error={error}
          isFetching={isFetching}
          onContactSelect={(contact) => {
            setSelectedContact(contact);
          }}
          selectedContact={selectedContact}
        />
      </div>
      <div className="detail-panel">
        <ContactDetail
          key={ selectedContact?._id ?? "empty"}
          selectedContact={selectedContact}
          setContacts={setContacts}
          setCurrentPage={setCurrentPage}
          setSelectedContact={setSelectedContact}
        />
      </div>
    </div>
  );
}
