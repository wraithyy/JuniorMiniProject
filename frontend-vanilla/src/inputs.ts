import initBirthDate from "./initFields/birthDate";
import initEmail from "./initFields/email";
import initGender from "./initFields/gender";
import initHouseNumber from "./initFields/houseNumber";
import { initFirstName, initLastName } from "./initFields/notEmpty";
import { initCity, initNote, initStreet } from "./initFields/optionalString";
import initPhone from "./initFields/phone";
import initZipCode from "./initFields/zipCode";

export function initializeInputFields(root: ParentNode) {
  return {
    getFirstName: initFirstName(root),
    getLastName: initLastName(root),
    getEmail: initEmail(root),
    getGender: initGender(root),
    getBirthDate: initBirthDate(root),
    getPhone: initPhone(root),
    getCity: initCity(root),
    getStreet: initStreet(root),
    getHouseNumber: initHouseNumber(root),
    getZipCode: initZipCode(root),
    getNote: initNote(root),
  };
}
