import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { ContactDetail } from './components/ContactDetail';
import type { Contact } from './types/contact';
import './App.css';

type Page = 'form' | 'list';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('form');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // TODO: Implementovat navigaci mezi stránkami
  // TODO: Implementovat handlery pro vytvoření/editaci kontaktu
  // TODO: Implementovat výběr kontaktu ze seznamu
  //
  // Tato kostra ukazuje základní strukturu aplikace.
  // Junioři mohou implementovat detaily podle zadání.

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
              console.log('TODO: Implementovat vytvoření kontaktu', contact);
            }}
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
              <ContactDetail contact={selectedContact} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
