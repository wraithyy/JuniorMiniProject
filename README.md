# Testovací API pro naučení fetch v JavaScriptu

Tento projekt slouží jako výukový materiál pro junior vývojáře. Obsahuje kompletní backend API a dvě varianty frontendu (React + Vanilla TypeScript) pro naučení práce s REST API a fetch metodou.

## Požadavky

- **Node.js** 20 LTS nebo 22 LTS ([nodejs.org](https://nodejs.org/))
- **MongoDB** 5.x+ (viz instalace níže)
- **Yarn** (kvůli workspaces) - `npm install -g yarn`

## Instalace MongoDB

### Varianta A: Docker (doporučeno)

```bash
# Stáhnout MongoDB image
docker pull mongodb/mongodb-community-server:latest

# Spustit MongoDB kontejner
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest

# Ověřit že běží
docker ps
```

Pro zastavení/spuštění:

```bash
docker stop mongodb
docker start mongodb
```

### Varianta B: Lokální instalace

Stáhnout a nainstalovat z [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) a následovat instrukce pro váš operační systém.

## Instalace Projektu

```bash
# 1. Naklonovat repository
git clone https://github.com/wraithyy/JuniorMiniProject.git
cd JuniorMiniProject

# 2. Nainstalovat dependencies
yarn

# 3. Spustit projekt
yarn start              # React frontend + backend
# NEBO
yarn start:vanilla      # Vanilla TS frontend + backend
```

## Přístupy k aplikaci

- **Backend API:** `http://localhost:3333`
- **Swagger dokumentace:** `http://localhost:3333/swagger`
- **React Frontend:** `http://localhost:3000`
- **Vanilla Frontend:** `http://localhost:3001`

## Zadání

### Cíl

Vytvořit aplikaci pro správu kontaktů s využitím připraveného REST API.

### Máte na výběr dva přístupy

1. **React + TypeScript** (`/frontend`) - Moderní framework s připravenými komponentami
2. **Vanilla TypeScript** (`/frontend-vanilla`) - Plain JavaScript/TypeScript pro pochopení základů

### Zadání obsahuje dvě hlavní stránky

#### Stránka 1: Formulář pro vytvoření/editaci kontaktu

**Povinná pole:**

- Jméno (firstName)
- Příjmení (lastName)
- Email (email)

**Ostatní pole:**

- Radio buttons: Pohlaví (gender)
- Telefon (phone)
- Poznámka (note)
- Adresa: Město (city), Ulice (street), Číslo popisné (houseNumber), PSČ (zipCode)
- Datum narození (birthDate) - formátované pole

**Požadavky:**

- Validace vstupů (povinná pole, validní email)
- Zobrazení chybových hlášek
- Styling pomocí CSS/SCSS

**Bonusové úkoly:**

- Loading indikátor při odesílání
- Zobrazení úspěšné/chybové hlášky po odeslání

#### Stránka 2: Seznam kontaktů

**Požadavky:**

- Načtení všech kontaktů z API
- Zobrazení seznamu jmen kontaktů
- Po kliknutí na jméno zobrazit celé info o kontaktu (v jiné části stránky)
- Tlačítko "Smazat" u každého kontaktu
- Styling pomocí CSS/SCSS

**Bonusový úkol:**

- Kliknutím na kontakt přejít na editační formulář
- Předvyplnit data
- Po odeslání aktualizovat kontakt v databázi (PATCH endpoint)

## API Dokumentace

Veškerá dokumentace API je dostupná po spuštění aplikace na:

```
http://localhost:3333/swagger
```

Obsahuje všechny endpointy, parametry, request/response modely a možnost vyzkoušet si API přímo v prohlížeči.

## Pro Pedagogy/Reviewery

### Co je připraveno

**Backend:**

- Kompletní REST API s validacemi (joi)
- MongoDB databáze
- Swagger dokumentace
- CORS konfigurace
- Error handling

**React Frontend:**

- Vite + React 19 + TypeScript setup
- TypeScript typy pro Contact model
- API klient s připravenými fetch metodami
- Základní struktura komponent (prázdné, s TODO komentáři)
- Proxy na backend (Vite dev server)

**Vanilla Frontend:**

- Vite + TypeScript setup
- Základní HTML kostra
- Prázdný main.ts soubor s TODO komentáři

### Co mají junioři implementovat

- Formulářové komponenty / DOM manipulaci
- Volání API (React: přes připravený klient, Vanilla: fetch)
- Zobrazení dat
- Styling
- Error handling a user feedback

## Monorepo Poznámky

Projekt používá Yarn workspaces pro správu monorepa.

**Užitečné příkazy:**

```bash
# Přidat dependency do konkrétního workspace
yarn workspace <název> add <package>

# Příklad: Přidat axios do React frontendu
yarn workspace frontend add axios

# Spustit script v konkrétním workspace
yarn workspace <název> <script>

# Příklad: Spustit dev server pro React frontend
yarn workspace frontend dev
```

## Doporučený Postup Pro Juniory

### Týden 1: Seznámení

1. Prozkoumat Swagger dokumentaci
2. Vyzkoušet API endpointy přes Postman/Thunder Client/curl
3. Pochopit data model (Contact)
4. Rozběhnout projekt lokálně

### Týden 2-3: Implementace

1. Začít jednoduchým zobrazením seznamu kontaktů
2. Implementovat formulář pro vytvoření kontaktu
3. Přidat detail kontaktu
4. Přidat mazání kontaktu
5. Styling

### Týden 4: Bonusové úkoly a refactoring

1. Implementovat editaci
2. Vylepšit UX (loading stavy, hlášky)
3. Code review vlastního kódu
4. Refactoring

## Technologie

### Backend

- Node.js
- Express.js 4.21.2
- MongoDB + Mongoose 8.9.3
- Joi 17.13.3 (validace)
- Swagger Generator Express

### React Frontend

- React 19.0.0
- TypeScript 5.7.2
- Vite 6.0.5

### Vanilla Frontend

- TypeScript 5.7.2
- Vite 6.0.5

## License

MIT

## Autor

Josef Kvapil
