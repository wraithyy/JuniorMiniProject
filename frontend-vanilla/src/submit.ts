import { FieldAdapter as fa} from './initFields/types';

function allInputsvalid(fields: fa[]): boolean {
    return fields.every(f => f.isValid());
}

export default function submitContact(firstName: fa, lastName: fa, email: fa, gender: fa, phone: fa) {
    const form = document.querySelector('#contact-form') as HTMLFormElement | null;

    if (!form) {
        console.warn('Form #contact-form not found.');
        return;
    }

    const fields = [firstName, lastName, email, gender, phone];
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent page reload
        if (allInputsvalid(fields)) {
            console.log(email.getValue() + " " + phone.getValue())
        }
        else {
            return;
        }
    });
}
