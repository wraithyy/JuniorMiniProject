import initPhone from './initFields/phone';
import initEmail from './initFields/email';
import initGender from './initFields/gender';
import { initFirstName, initLastName } from './initFields/notEmpty';
import { initCity, initStreet, initNote } from './initFields/optionalString';
import initHouseNumber from './initFields/houseNumber';
import initZipCode from './initFields/zipCode';
import initBirthDate from './initFields/birthDate';

export default{
    getFirstName : initFirstName(),
    getLastName : initLastName(),
    getEmail : initEmail(),
    getGender : initGender(),
    getBirthDate : initBirthDate(),
    getPhone : initPhone(),
    getCity : initCity(),
    getStreet : initStreet(),
    getHouseNumber : initHouseNumber(),
    getZipCode : initZipCode(),
    getNote : initNote()
}