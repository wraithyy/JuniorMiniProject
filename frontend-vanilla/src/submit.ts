import { sendHttpRequest } from './apiComm'
import { getErrorElement } from './helpers';
// the function will submit contact on submit event
// submits if the form passes the validity
export default function handleSubmit(root: HTMLFormElement, inputs: Record<string, () => string>) {
    root.addEventListener('submit', event => {
        event.preventDefault();
        // for (const input in inputs) {
        //     console.log(`${input}: ${inputs[input]()}`);
        // }
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

        function setSubmitMessage(submitMsgElement: HTMLElement | null, text: string, classToSet: string|null = null){
        if (submitMsgElement) {
            submitMsgElement.textContent = text;
            if (classToSet){
                submitMsgElement.classList = classToSet;
            }
        }

    }

        let submitMsgElement: HTMLElement | null;
        const submitElement = root.querySelector<HTMLInputElement>('#submit-btn');
        if (submitElement) {
            submitMsgElement = getErrorElement(submitElement);
        }

        sendHttpRequest("POST", contact)
            .then((value) => {
                // console.log(value.message);
                setSubmitMessage(submitMsgElement, value.message, "success");
                root.reset();
            })
            .catch((err) => {
                setSubmitMessage(submitMsgElement, err, "error");
            }
            )
            .finally(() => {
                setTimeout( () => {
                    setSubmitMessage(submitMsgElement, "")
                }, 3000);
            });

    });
}
