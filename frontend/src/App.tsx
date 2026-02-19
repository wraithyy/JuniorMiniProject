import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactView from "./components/contactView/ContactView";
import type { Contact } from "./types/contact";
import type { Page } from "./types/page";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("form");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  return (
    <div className="app">
      <header>
        <h1>Správa kontaktů</h1>
        <nav>
          <button
            className={currentPage === "form" ? "selected-btn" : undefined}
            onClick={() => {
              setCurrentPage("form");
              setSelectedContact(null);
            }}
            type="button"
          >
            Vytvořit kontakt
          </button>
          <button
            className={currentPage === "list" ? "selected-btn" : undefined}
            onClick={() => setCurrentPage("list")}
            type="button"
          >
            Seznam kontaktů
          </button>
        </nav>
      </header>

      <main>
        {currentPage === "form" ? (
          <ContactForm
            initialData={selectedContact}
            key={selectedContact?._id}
            onSubmit={(contact) => {
              setSelectedContact(contact);
              setCurrentPage("list");
            }}
          />
        ) : (
          <ContactView
            selectedContact={selectedContact}
            setCurrentPage={setCurrentPage}
            setSelectedContact={setSelectedContact}
          />
        )}
      </main>
    </div>
  );
}

export default App;
