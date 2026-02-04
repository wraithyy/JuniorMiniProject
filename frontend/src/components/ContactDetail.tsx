
import type { Contact } from '../types/contact';

type ContactDetailProps = {
  contact: Contact | null;
  onContactSelect?: (contact: Contact) => void;
  handleDelete: (contact: Contact) => void;
  handleEditPage: (contact: Contact) => void;
}

export const ContactDetail = ({ contact,  handleDelete, handleEditPage } : ContactDetailProps) => {
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

  if (!contact) {
    return (
      <div>
        <p>Please pick a contact to see detail of.</p>
      </div>
    );
  }

  function calculateDate(date: string | undefined){
      if (date){
          const dateLong = new Date(date)

          const den = String(dateLong.getDate()).padStart(2, "0")
          const mesic = String(dateLong.getMonth()+1).padStart(2,"0")
          const rok = dateLong.getFullYear();

          return`${den}-${mesic}-${rok}`

      } else {
          return ""
      }
  }


  return (
    <div>
      <h2>Contact detail - {contact.firstName} {contact.lastName}</h2>
        <p><b>Email: </b>{contact.email}</p>
        <p><b>Phone: </b>{contact.phone}</p>
        <p><b>Birthday: </b>{calculateDate(contact.birthDate)}</p>
        <p><b>Note: </b>{contact.note}</p>
        <p><b>Gender: </b>{contact.gender}</p>
        <fieldset>
            <legend><b>Address</b></legend>
            <p><b>City: </b>{contact.city}</p>
            <p><b>Street: </b>{contact.street}</p>
            <p><b>House Number: </b>{contact.houseNumber}</p>
            <p><b>Zip Code: </b>{contact.zipCode}</p>
        </fieldset>

        <button className={"delete-btn"} type={"button"} onClick={()=> handleDelete(contact)} >DELETE</button>

        <button type={"button"} className={"edit-btn"} onClick={() => handleEditPage(contact)} >EDIT</button>

        {/* TODO buttons for edit */}
    </div>
  );
};
