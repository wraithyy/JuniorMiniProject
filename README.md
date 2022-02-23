# Testovací api pro naučení fetch v javascriptu

## Instalace

1. Stáhnout a nainstalovat [MondoDB](https://www.mongodb.com/try/download/community)
2. Nainstalovat Node.js
3. Naklonovat si toto repo
4. `npm install` v rooto složky s touto aplikací
5. `npm start` v rootu složky s touto aplikací
6. API defaultně poslouchá na `localhost:3333`

## Zadání

### Vytvořit Aplikaci která bude obsahovat dvě části:

1.  Stránka s formulářem která bude splnovat toto:

    - vstupní pole pro všeny prvky kontaktního formuláře
    - Formulář s odesílacím tlačítkem
    - Nastylované pomocí CSS nebo SCSS
    - radioButton pro pohlaví
    - základní validace vstupů a chybová hláška v případě že nějaký vstup není validní
    - Dobrovolné: Loader při odesilání, zobrazení hlášky o úspěšném uložení.

2.  Stránka se seznamem kontaktů
    - Stránka která z api načte všechny kontakty a zobrazí jejich jména.
    - Po kliknutí na jméno se v jiné části obrazovky zobrazí celé info o uživateli
    - Nastylované pomocí CSS nebo SCSS

> Dobrovolné: Proklik z kontaktu na 1. stránku, která si načte data na daný kontakt, vyplní info do políček a při odeslání zedituje daný kontakt v databázi.
