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
  const [initialData, setInitialData] = useState<Contact | null>(null)

  // TODO: Implementovat navigaci mezi stránkami
  // TODO: Implementovat handlery pro vytvoření/editaci kontaktu
  // TODO: Implementovat výběr kontaktu ze seznamu
  //
  // Tato kostra ukazuje základní strukturu aplikace.
  // Junioři mohou implementovat detaily podle zadání.


    //TODO sem jednou hodit useeffect pro načtení dat


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

    function handleEditPage(contact: Contact){
      setInitialData(contact);
      setCurrentPage("form");
      setSelectedContact(null);
    }

  return (
    <div className="app">
      <header>
        <h1>Správa kontaktů</h1>
        <nav>
          <button type={"button"} onClick={() => {
              setCurrentPage('form')
              setInitialData(null)
          }}>Vytvořit kontakt</button>
          <button type={"button"} onClick={() => setCurrentPage('list')}>Seznam kontaktů</button>
        </nav>
      </header>

      <main>
        {currentPage === 'form' ? (
          <ContactForm
            onSubmit={(contact) => {

                if(contact._id){
                    contactsApi.updateContact(contact._id, contact).then(r => console.log(r))
                } else {
                    contactsApi.createContact(contact).then(r => console.log(r));
                }

            }}
            initialData={initialData}
          />
        ) : (
          <div className="list-view">
            <div className="list-panel">
              <ContactList key={reload}
                onContactSelect={(contact) => {
                  setSelectedContact(contact);
                }}
                selectedContact={selectedContact}
              />
            </div>
            <div className="detail-panel">
              <ContactDetail contact={selectedContact} onContactSelect={(contact) => setSelectedContact(contact)}
                 handleDelete={(contact: Contact) => handleDelete(contact)}
                 handleEditPage={(contact: Contact) => handleEditPage(contact)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
