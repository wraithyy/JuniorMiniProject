# React Frontend - Správa Kontaktů

Moderní React aplikace s TypeScript a Vite pro správu kontaktů.

## Technologie

- **React 19.0.0** - Nejnovější verze React frameworku
- **TypeScript 5.7.2** - Typová bezpečnost
- **Vite 6.0.5** - Rychlý build tool a dev server

## Spuštění

```bash
# Z root složky projektu
yarn start

# Nebo přímo z této složky
yarn dev
```

Aplikace se spustí na `http://localhost:3000`

## Struktura Projektu

```
src/
├── types/
│   └── contact.ts          # TypeScript typy pro Contact model
├── api/
│   └── contactsApi.ts      # API klient s fetch metodami
├── components/
│   ├── ContactForm.tsx     # Formulář pro vytvoření/editaci (TODO)
│   ├── ContactList.tsx     # Seznam kontaktů (TODO)
│   └── ContactDetail.tsx   # Detail kontaktu (TODO)
├── App.tsx                 # Hlavní komponenta aplikace
├── App.css                 # Styling pro App
├── main.tsx                # Entry point
└── index.css               # Globální styly
```

## Co je připraveno

### TypeScript Typy (`src/types/contact.ts`)

Připravené TypeScript interfaces pro práci s API:
- `Contact` - Interface pro kontakt
- `ContactsResponse` - Response z GET /api/contacts
- `ContactResponse` - Response z ostatních endpointů

### API Klient (`src/api/contactsApi.ts`)

Připravený API klient s metodami:
- `getAllContacts()` - Načte všechny kontakty
- `getContact(id)` - Načte jeden kontakt
- `createContact(contact)` - Vytvoří nový kontakt
- `updateContact(id, contact)` - Aktualizuje kontakt
- `deleteContact(id)` - Smaže kontakt

**Použití:**
```typescript
import { contactsApi } from './api/contactsApi';

// Načtení všech kontaktů
const contacts = await contactsApi.getAllContacts();

// Vytvoření kontaktu
const newContact = await contactsApi.createContact({
  firstName: 'Jan',
  lastName: 'Novák',
  email: 'jan@example.com'
});
```

### Komponenty

Základní struktura komponent s TODO komentáři. Každá komponenta obsahuje detailní instrukce co implementovat.

## Co máte implementovat

### 1. ContactForm.tsx
- Formulář se všemi poli (jméno, příjmení, email, pohlaví, atd.)
- Validace vstupů
- Zobrazení chybových hlášek
- Volání `contactsApi.createContact()` nebo `contactsApi.updateContact()`

### 2. ContactList.tsx
- Načtení kontaktů pomocí `contactsApi.getAllContacts()`
- Zobrazení seznamu kontaktů
- Tlačítko "Smazat" s voláním `contactsApi.deleteContact()`
- Předání vybraného kontaktu do DetailComponent

### 3. ContactDetail.tsx
- Zobrazení všech informací o kontaktu
- Styling

### 4. Styling
- Vlastní CSS/SCSS
- Responzivní design

## API Dokumentace

Backend API běží na `http://localhost:3333`

Kompletní dokumentace na: `http://localhost:3333/swagger`

## Užitečné příkazy

```bash
# Spustit dev server
yarn dev

# Build pro produkci
yarn build

# Preview produkčního buildu
yarn preview

# Přidat novou dependency
yarn add <package>
```

## Tips

1. **React Hooks:** Použijte `useState` pro stav komponent a `useEffect` pro načítání dat z API
2. **Error Handling:** Ošetřete chyby při API voláních (try/catch)
3. **Loading States:** Přidejte loading indikátory během načítání/odesílání
4. **TypeScript:** Využijte připravené typy pro typovou bezpečnost
5. **Dev Tools:** Použijte React DevTools pro debugging

## Další Zdroje

- [React dokumentace](https://react.dev/)
- [TypeScript dokumentace](https://www.typescriptlang.org/)
- [Vite dokumentace](https://vite.dev/)
