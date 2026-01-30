import { sendHttpRequest } from './apiComm'
import { getErrorElement } from './helpers';
import { initializeInputFields } from './inputs'
import {form} from './helpers';
import { displayContatPage } from './contactPage'

// the function will submit contact on submit event
// submits if the form passes the default validity check
export default function handleSubmit() {
    if (!form){
        return;
    }
    const inputs = initializeInputFields(form);
    form.addEventListener('submit', event => {
        event.preventDefault();
        const contact = {
            firstName: inputs.getFirstName(),
            lastName: inputs.getLastName(),
            email: inputs.getEmail(),
            phone: inputs.getPhone(),
            note: inputs.getNote(),
            gender: inputs.getGender(),
            city: inputs.getCity(),
            street: inputs.getStreet(),
            houseNumber: inputs.getHouseNumber(),
            zipCode: inputs.getZipCode(),
            birthDate: inputs.getBirthDate(),
        };

        function setSubmitMessage(submitMsgElement: HTMLElement | null, text: string, classToSet: string | null = null) {
            if (submitMsgElement) {
                submitMsgElement.textContent = text;
                if (classToSet) {
                    submitMsgElement.classList = classToSet;
                }
            }

        }

        let submitMsgElement: HTMLElement | null;
        if (form){
            const submitElement = form.querySelector<HTMLInputElement>('#submit-btn');
            if (submitElement) {
                submitMsgElement = getErrorElement(submitElement);
            }

            const contactID = form.getAttribute("data-contact-id") || '';
            const method = contactID ? "PATCH" : "POST";

            sendHttpRequest(method, contact, contactID)
                .then((value) => {
                    setSubmitMessage(submitMsgElement, value.message, "success");
                    form?.reset();
                    if (method === "PATCH") {
                        form?.removeAttribute("data-contact-id");
                        setTimeout(() => {
                            displayContatPage();
                        }, 1000);
                    }
                })
                .catch((err) => {
                    setSubmitMessage(submitMsgElement, err, "error");
                }
                )
                .finally(() => {
                    setTimeout(() => {
                        setSubmitMessage(submitMsgElement, "")
                    }, 3000);
                });
        }
        
        
    });
}
