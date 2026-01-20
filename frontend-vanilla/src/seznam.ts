import '/src/styles/main.css';
import {Contact} from "./Contact.ts";
import {formatDate} from "date-fns";


const app = document.getElementById('app');

if (app){

    //Načtení kontaktů z API
    try {
        console.log('App loaded!');
        const response = await fetch('/api/contacts');

        if (!response.ok) {
            console.log('Contact not found!');
            throw Error(response.statusText);
        } else {
            document.getElementById("message")?.setAttribute("style", "display: none;");
        }

        console.log(response);
        const data = await response.json();
        const contacts = data.data;
        console.log('contacts', contacts);



        contacts.forEach((contact: Contact) => {
            const li = document.createElement('li');
            li.setAttribute('class', 'contact');
            li.setAttribute('id', 'id_'+contact._id);

            let date = ""
            if (contact.birthDate) {
                date = formatDate(contact.birthDate, "yyyy-MM-dd") ?? "";
            }

            li.innerHTML = `<div class="contact-name">${contact.firstName ?? ""} ${contact.lastName ?? ""}</div>
                            <div class="detail-panel" style="display: none">
                                Email: ${contact.email ?? ""} <br>
                                Phone: ${contact.phone ?? ""} <br>
                                Note: ${contact.note ?? ""} <br>
                                Gender: ${contact.gender ?? "Preferred not to say"} <br>
                                Birthday: ${date ?? ""} <br>
                                
                                <fieldset>
                                    <legend>Adress</legend>
                                    City: ${contact.city ?? ""} <br>
                                    Street: ${contact.street ?? ""} <br>
                                    House Number: ${contact.houseNumber ?? ""} <br>
                                    Zip Code: ${contact.zipCode ?? ""} <br>
                                </fieldset> 
                                
                                <br>
                                <div id="delete-${contact._id}">
                                    <button class="submit"><a href="/index.html?id=${contact._id}" >Edit</a></button>
                                </div>
                          </div>
                        `;

            li.addEventListener('click', (e) => {
                const target = e.target;
                if (!(target instanceof Element)) return;

                if (target.classList.contains('contact-name')) {
                    const contactItem = target.closest('.contact');
                    const detail = contactItem?.querySelector('.detail-panel') as HTMLElement;

                    if (!detail) return;

                    if (detail.style.display === 'none') {
                        detail.style.display = 'block';
                    } else {
                        detail.style.display = 'none'; }
                }
            });


            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            const deleteBtnErMes = document.createElement('div');
            deleteBtnErMes.style.display = 'none';
            deleteBtnErMes.style.color = 'red';
            deleteBtnErMes.textContent = 'Nepodařilo se smazat kontakt.';

            deleteBtn.addEventListener('click', async () => {
                if(window.confirm("Are you sure you want to delete this contact? " + contact.firstName + " " + contact.lastName)) {

                    deleteBtn.disabled = true;
                    deleteBtn.setAttribute('style', "cursor: not-allowed");

                    try {
                        const response = await fetch(`/api/contacts/${contact._id}`, {
                            method: 'DELETE'
                        });
                        if (!response.ok) {throw Error(response.statusText);}
                        li.remove();

                    } catch (errors) {
                        console.log("Nepodařilo se smazat kontakt.");
                        console.log(errors);
                        deleteBtn.disabled = false;
                        deleteBtn.setAttribute('style', "cursor: pointer");

                        deleteBtnErMes.style.display = 'block';

                    }
                }

            });



            //Přidáváme celý list a delete button na stránku
            const list = document.getElementById('contacts-list');
            if (list) {
                list.appendChild(li);

                const deleteDiv = document.getElementById('delete-'+contact._id);
                if (deleteDiv) {
                    deleteDiv.appendChild(deleteBtn)
                    deleteDiv.appendChild(deleteBtnErMes)
                }
            }

        });

    } catch (errors){
        console.error(errors);
        let app = document.getElementById('app');
        if (app){ // @ts-ignore
            app.innerHTML = "Ups something went wrong (╥﹏╥)<br>"
        app.setAttribute('style', 'color: red');}
    }

}