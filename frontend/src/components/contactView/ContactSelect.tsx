import type { Contact, OnContactSelect } from "../../types/contact";

interface ContactSelectProps {
  contact: Contact;
  onContactSelect: OnContactSelect;
  selectedContact: Contact | null;
}

export default function ContactSelect({
  contact,
  onContactSelect,
  selectedContact,
}: ContactSelectProps) {
  return (
    <li>
      <button
        className={
          contact._id === selectedContact?._id ? "selected-btn" : undefined
        }
        onClick={() => onContactSelect(contact)}
        type="button"
      >
        {contact.firstName} {contact.lastName}
      </button>
    </li>
  );
}
