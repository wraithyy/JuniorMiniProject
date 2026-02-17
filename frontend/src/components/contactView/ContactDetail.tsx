import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { useDeleteContact } from "../../hooks/fetching/useDeleteContact.ts";
import type { Contact } from "../../types/contact";
import type { Page } from "../../types/page";
import { outputFormatters } from "../../utils/outputFormatters.ts";

interface ContactDetailProps {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    setCurrentPage: Dispatch<SetStateAction<Page>>;
    selectedContact: Contact | null;
    setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}
export const ContactDetail: FC<ContactDetailProps> = ({
  selectedContact,
  setCurrentPage,
  setSelectedContact,
  setContacts,
}) => {
  // TODO: Implementovat detail kontaktu:
  //
  // 1. Zobrazit všechny informace o kontaktu
  //    - Jméno a příjmení
  //    - Email
  //    - Pohlaví
  //    - Telefon
  //    - Poznámka
  //    - Adresa (město, ulice, číslo popisné, PSČ)
  //    - Datum narození
  //
  // 2. Styling pomocí CSS/SCSS
  //
  // 3. Pokud contact je null, zobrazit výzvu k výběru kontaktu
  //
  // Bonusový úkol:
  // - Tlačítko "Editovat" které otevře formulář s předvyplněnými daty
  const { deleteContact, isFetching } = useDeleteContact();
  const [errorMsg, setErrorMsg] = useState("");

  if (!selectedContact) {
    return (
      <div>
        <p>Vyberte kontakt ze seznamu pro zobrazení detailu</p>
      </div>
    );
  }

  function handleUpdate() {
    setSelectedContact(selectedContact);
    setCurrentPage("form");
  }

  async function handleDelete() {
    if (selectedContact?._id) {
      try {
        await deleteContact(selectedContact._id);
        setContacts((prev) =>
          prev.filter((c) => c._id !== selectedContact._id)
        );
        setSelectedContact(null);
      } catch {
        setErrorMsg("Nepodařilo se smazat kontakt.");
      }
    }
  }

  return (
    <div className="contact-detail-card">
      <h2>Detail kontaktu</h2>
      <table className="contact-detail">
        <tbody>
          <tr>
            <td>Vybraný kontakt:</td>
            <td>
              {selectedContact.firstName} {selectedContact.lastName}
            </td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td>{selectedContact.email}</td>
          </tr>
          {selectedContact.birthDate && (
            <tr>
              <td>Datum narození:</td>
              <td>
                {new Date(selectedContact.birthDate).toLocaleDateString(
                  "cs-CZ"
                )}
              </td>
            </tr>
          )}
          {selectedContact.gender && (
            <tr>
              <td>Pohlaví:</td>
              <td>{outputFormatters.gender(selectedContact.gender)}</td>
            </tr>
          )}
          {selectedContact.phone && (
            <tr>
              <td>Telefon:</td>
              <td>{selectedContact.phone}</td>
            </tr>
          )}
          {selectedContact.city && (
            <tr>
              <td>Město:</td>
              <td>{selectedContact.city}</td>
            </tr>
          )}
          {selectedContact.street && (
            <tr>
              <td>Ulice:</td>
              <td>{selectedContact.street}</td>
            </tr>
          )}
          {selectedContact.houseNumber && (
            <tr>
              <td>Číslo popisné:</td>
              <td>{selectedContact.houseNumber}</td>
            </tr>
          )}
          {selectedContact.zipCode && (
            <tr>
              <td>PSČ:</td>
              <td>{selectedContact.zipCode}</td>
            </tr>
          )}
          {selectedContact.note && (
            <tr>
              <td>Poznámka:</td>
              <td>{selectedContact.note}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="contact-detail-buttons">
        <button
          className="update-btn"
          disabled={isFetching}
          onClick={handleUpdate}
          type="button"
        >
          Upravit
        </button>
        <button
          className="delete-btn"
          disabled={isFetching}
          onClick={handleDelete}
          type="button"
        >
          Smazat
        </button>
      </div>
      {isFetching && <p>Probíhá mazání kontaktu</p>}
      {errorMsg && <p className="state-error">{errorMsg}</p>}
    </div>
  );
};
