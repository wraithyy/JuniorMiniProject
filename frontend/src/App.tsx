import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { ContactDetail } from './components/ContactDetail';
import type { Contact } from './types/contact';
import './App.scss';
import Button from '@mui/material/Button';

type Page = 'form' | 'list';

const EMPTY_CONTACT: Contact = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  phone: '',
  note: '',
  city: '',
  street: '',
  houseNumber: '',
  zipCode: undefined,
  birthDate: '',
};


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('form');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <div className="app">
      <header>
        <h1>Správa kontaktů</h1>
        <nav>
          <Button variant="contained" onClick={() => { setSelectedContact(null); setCurrentPage('form')} }>Vytvořit kontakt</Button>
          <Button variant="contained" onClick={() => setCurrentPage('list')}>Seznam kontaktů</Button>
        </nav>
      </header>

      <main>
        {currentPage === 'form' ? (
          <ContactForm
            onSubmit={() => {}}
            initialData={selectedContact ?? EMPTY_CONTACT}
          />
        ) : (
          <div className="list-view">
            <div className="list-panel">
              <ContactList
                onContactSelect={(contact) => {
                  setSelectedContact(contact);
                }}
              />
            </div>
            <div className="detail-panel">
              <ContactDetail contact={selectedContact} onEdit={() => setCurrentPage('form')} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
