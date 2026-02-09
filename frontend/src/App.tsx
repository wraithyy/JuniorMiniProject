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
  const [initialData, setInitialData] = useState<Contact | null>(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [saving, setSaving] = useState(false);



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


    function onSubmit (contact: Contact) {
        if(contact._id){

            setSaving(() => true)
             contactsApi.updateContact(contact._id, contact).then(r => {
                console.log(r);
                 setCurrentPage("list");
                 setSelectedContact(r)
                 setErrorMessage("")

            }).catch(error => {
                console.log(error)
                console.log("upsík error");
                setErrorMessage("There was a problem saving the contact.")

            }).finally(() => {
                console.log("je možné znova upravovat");
                setSaving(false)
            })

        } else {

            setSaving(() => true)
             contactsApi.createContact(contact).then(r => {
                console.log(r);
                setCurrentPage("list");
                setSelectedContact(r)
                 setErrorMessage("")


             }).catch(error => {
                console.log(error)
                console.log("upsík error")
                 setErrorMessage("There was a problem saving the contact.")

            }).finally(() => {
                console.log("je možné znova upravovat");
                setSaving(false)
            })
        }
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
            onSubmit={(contact) => {onSubmit(contact)}}
            initialData={initialData} saving={saving} errorMessage={errorMessage}
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
