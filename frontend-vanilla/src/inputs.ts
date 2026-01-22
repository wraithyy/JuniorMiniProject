import initPhone from './initFields/phone';
import initEmail from './initFields/email';
import initGender from './initFields/gender';
import { initFirstName, initLastName } from './initFields/notEmpty';
import { initCity, initStreet, initNote } from './initFields/optionalString';
import initHouseNumber from './initFields/houseNumber';
import initZipCode from './initFields/zipCode';
import initBirthDate from './initFields/birthDate';


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
