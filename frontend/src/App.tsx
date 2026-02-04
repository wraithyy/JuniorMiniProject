import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { ContactDetail } from './components/ContactDetail';
import type { Contact } from './types/contact';
import './App.css';
import { contactsApi } from './api/contactsApi'

type Page = 'form' | 'list';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('form');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [reload, setReload] = useState(0);

  // TODO: Implementovat navigaci mezi stránkami
  // TODO: Implementovat handlery pro vytvoření/editaci kontaktu
  // TODO: Implementovat výběr kontaktu ze seznamu
  //
  // Tato kostra ukazuje základní strukturu aplikace.
  // Junioři mohou implementovat detaily podle zadání.



    //TODO delete
    function handleDelete(contact: Contact){

        window.confirm(`Are you sure you want to delete contact: ${contact.firstName} ${contact.lastName}` )

        if (contact._id) {
            contactsApi.deleteContact(contact._id).then(r => {
                console.log(r);
                setSelectedContact(null)
                setReload(prev => prev+1)
            })
        }
    }

  return (
    <div className="app">
      <header>
        <h1>Správa kontaktů</h1>
        <nav>
          <button onClick={() => setCurrentPage('form')}>Vytvořit kontakt</button>
          <button onClick={() => setCurrentPage('list')}>Seznam kontaktů</button>
        </nav>
      </header>

      <main>
        {currentPage === 'form' ? (
          <ContactForm
            onSubmit={(contact) => {
              contactsApi.createContact(contact).then(r => console.log(r));
            }}
          />
        ) : (
          <div className="list-view">
            <div className="list-panel">
              <ContactList
                onContactSelect={(contact) => {
                  setSelectedContact(contact);
                }}
                selectedContact={selectedContact}
                reload={reload}
              />
            </div>
            <div className="detail-panel">
              <ContactDetail contact={selectedContact} onContactSelect={(contact) => setSelectedContact(contact)}
                  handleDelete={(contact: Contact) => handleDelete(contact)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
