import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { ContactDetail } from './components/ContactDetail';
import type { Contact } from './types/contact';
import './App.scss';
import { Tabs, Tab, Typography, ThemeProvider, createTheme, THEME_ID } from '@mui/material';

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

const materialTheme = createTheme({
  typography: {
    h1: { fontSize: 32 },
    h2: { fontSize: 28, marginBottom: 12 },
    h3: { fontSize: 24 },
  }
});

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('form');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  function handlePageChange(_e: React.SyntheticEvent, newVal: Page) {
    if (newVal === 'form')
      setSelectedContact(null);

    setCurrentPage(newVal);
  }

  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <div className="app">
        <header>
          <Typography variant="h1">Správa kontaktů</Typography>
          <Tabs value={currentPage} onChange={handlePageChange}>
            <Tab label="Vytvořit kontakt" value="form" onClick={() => setSelectedContact(null)} />
            <Tab label="Seznam kontaktů" value="list" />
          </Tabs>
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
                  selectedContact={selectedContact}
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
    </ThemeProvider>
  );
}

export default App;
