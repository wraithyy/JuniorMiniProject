import { useGetAllContacts } from "../../hooks/fetching/useGetAllContacts";
import type { AppStateProps } from "../../types/state";
import { ContactDetail } from "./ContactDetail";
import { ContactList } from "./ContactList";

export default function ContactView({
  selectedContact,
  setSelectedContact,
  setCurrentPage,
}: AppStateProps) {
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
