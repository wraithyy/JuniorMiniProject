# Vanilla TypeScript Frontend - Správa Kontaktů

Plain TypeScript aplikace bez frameworku pro pochopení základů práce s DOM a Fetch API.

## Technologie

- **TypeScript 5.7.2** - Typová bezpečnost
- **Vite 6.0.5** - Build tool a dev server
- **Vanilla JS/TS** - Žádné frameworky!

## Spuštění

```bash
# Z root složky projektu
yarn start:vanilla

# Nebo přímo z této složky
yarn dev
```

Aplikace se spustí na `http://localhost:3001`

## Struktura Projektu

```
src/
├── styles/
│   └── main.css    # Styly
└── main.ts         # Hlavní soubor aplikace (TODO)
```

## Co je připraveno

- Základní HTML struktura (`index.html`)
- Prázdný `main.ts` soubor s TODO komentáři
- Základní CSS

## Co máte implementovat

Kompletní aplikaci pro správu kontaktů pomocí čistého JavaScriptu/TypeScriptu!

### 1. Formulář pro vytvoření kontaktu
```typescript
// Vytvořit HTML formulář pomocí innerHTML nebo DOM API
// Přidat event listener na submit
// Zpracovat data a odeslat na API pomocí fetch

const form = document.createElement('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    firstName: // získat z inputu,
    lastName: // získat z inputu,
    email: // získat z inputu,
  };

  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
});
```

### 2. Seznam kontaktů
```typescript
// Načíst kontakty z API
const response = await fetch('/api/contacts');
const data = await response.json();
const contacts = data.data;

// Vyrenderovat seznam pomocí DOM manipulace
contacts.forEach(contact => {
  const li = document.createElement('li');
  li.textContent = `${contact.firstName} ${contact.lastName}`;
  li.addEventListener('click', () => {
    // Zobrazit detail
  });
  list.appendChild(li);
});
```

### 3. Detail kontaktu
- Zobrazit všechny informace o vybraném kontaktu
- Použít DOM manipulaci pro vykreslení

### 4. Smazání kontaktu
```typescript
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Smazat';
deleteBtn.addEventListener('click', async () => {
  await fetch(`/api/contacts/${contact._id}`, {
    method: 'DELETE'
  });
  // Znovu načíst seznam
});
```

## API Dokumentace

Backend API běží na `http://localhost:3333`

### Endpointy:
- `GET /api/contacts` - Načte všechny kontakty
- `POST /api/contacts` - Vytvoří nový kontakt
- `GET /api/contacts/:id` - Načte jeden kontakt
- `PATCH /api/contacts/:id` - Aktualizuje kontakt
- `DELETE /api/contacts/:id` - Smaže kontakt

Kompletní dokumentace: `http://localhost:3333/swagger`

## Proč Vanilla TypeScript?

Tento přístup vás naučí:
1. **DOM Manipulaci** - Jak pracovat s DOM bez frameworku
2. **Fetch API** - Jak volat REST API pomocí fetch
3. **Event Handling** - Jak reagovat na uživatelské akce
4. **Async/Await** - Jak pracovat s asynchronním kódem
5. **TypeScript** - Typová bezpečnost i bez frameworku

## Tips

1. **DOM API:** Použijte `document.createElement()`, `appendChild()`, `innerHTML`
2. **Event Listeners:** `addEventListener()` pro interaktivitu
3. **Fetch API:** Pro všechna volání na backend
4. **Error Handling:** Ošetřete chyby pomocí try/catch
5. **TypeScript:** Definujte vlastní interfaces pro typy

## Porovnání s React

| Vanilla TS | React |
|------------|-------|
| `document.createElement()` | JSX komponenty |
| `addEventListener()` | onClick props |
| Manuální DOM update | Automatický re-render |
| `innerHTML` | Virtual DOM |

## Užitečné příkazy

```bash
# Spustit dev server
yarn dev

# Build pro produkci
yarn build

# Preview produkčního buildu
yarn preview
```

## Další Zdroje

- [MDN - DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript dokumentace](https://www.typescriptlang.org/)
