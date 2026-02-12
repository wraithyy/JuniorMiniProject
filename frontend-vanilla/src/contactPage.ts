import { sendHttpRequest } from "./apiComm";
import { displayForm, fillFromSaved, hideForm } from "./formPage";
import { cutDateToYYYYMMDD } from "./helpers";
import type { Contact } from "./types";

const CONTACTS_LIST = document.getElementById("contacts-list");
if (CONTACTS_LIST === null) {
  console.warn("#contact-list not found");
}

const CONTACT_TPL = document.getElementById(
  "contact-item-tpl"
) as HTMLTemplateElement | null;
if (CONTACT_TPL === null) {
  console.warn("#contact-tpl not found");
}

function fillDetails(node: DocumentFragment, contact: Contact) {
  const summary = node.querySelector("summary");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  summary!.textContent = fullName;

  // displays non empty fields for details
  const fields: (keyof Contact)[] = [
    "email",
    "birthDate",
    "gender",
    "phone",
    "city",
    "street",
    "zipCode",
    "houseNumber",
    "note",
  ];
  for (const field of fields) {
    const fieldHtmlElement = node.querySelector(`#field-${field}`);
    if (fieldHtmlElement) {
      if (contact[field]) {
        fieldHtmlElement.textContent = contact[field];
      } else {
        const closestDiv = fieldHtmlElement.closest("div");
        closestDiv!.style.display = "none";
      }
    }
  }

  const birthDateHtmlElement = node.querySelector("#field-birthDate");
  if (birthDateHtmlElement) {
    birthDateHtmlElement.textContent = cutDateToYYYYMMDD(contact.birthDate);
  }
}

function generalizeClickArea(
  e: Event,
  li: HTMLLIElement,
  summary: HTMLElement
) {
  {
    const target = e.target as HTMLElement;

    // 1) Let native behavior work if clicking <summary>
    if (target.closest("summary")) {
      return;
    }

    // 2) Ignore when user is selecting text
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) {
      const { anchorNode, focusNode } = sel;
      if (
        (anchorNode && li.contains(anchorNode)) ||
        (focusNode && li.contains(focusNode))
      ) {
        return;
      }
    }
    // 3) Ignore clicks on buttons
    if (target.closest("button")) {
      return;
    }

    // 4) Otherwise, toggle
    summary!.click();
  }
}

function identifyDisplayedContact(li: HTMLLIElement, contact: Contact) {
  li.dataset._id = contact._id;
}

async function displayContactList(contacts: Contact[]) {
  if (CONTACTS_LIST && CONTACT_TPL) {
    CONTACTS_LIST.innerHTML = "";
    CONTACTS_LIST.style.display = "block";

    contacts.forEach((contact) => {
      const node = CONTACT_TPL.content.cloneNode(true) as DocumentFragment;
      const summary = node.querySelector("summary");
      if (!summary) {
        console.warn(
          "HTML definition issue - missing summary in template definition"
        );
        return;
      }
      const li = node.querySelector("li") as HTMLLIElement;

      fillDetails(node, contact);
      identifyDisplayedContact(li, contact);

      li.addEventListener("click", (e) => {
        generalizeClickArea(e, li, summary);
      });

      CONTACTS_LIST.appendChild(node);
    });
  }
}

export function hideContactList() {
  if (CONTACTS_LIST !== null) {
    CONTACTS_LIST.style.display = "none";
  }
}

export async function displayContatPage() {
  hideForm();
  try {
    const response = await sendHttpRequest("GET");
    const data = response.data;
    displayContactList(data);
    listenToContactEvents();
  } catch (error) {
    console.error("Failed to fetch page: ", error);
    alert(error);
  }
}

function getContactSummary(li: HTMLLIElement) {
  return li.querySelector("details > summary");
}

function listenToDeleteContact(contact_list: HTMLElement) {
  contact_list.querySelectorAll(".delete-btn").forEach((elem) => {
    elem.addEventListener("click", async () => {
      const closestLi = elem.closest("li");
      const contactName = getContactSummary(closestLi!)?.textContent;
      if (
        window.confirm(`Do you really want to delete contact ${contactName}`)
      ) {
        const contactID = closestLi?.dataset._id;
        try {
          await sendHttpRequest("DELETE", null, contactID);
          closestLi!.style.display = "none";
        } catch (error) {
          console.error("Failed to delete contact: ", error);
          alert(error);
        }
      }
    });
  });
}

function listenToUpdateContact(contact_list: HTMLElement) {
  contact_list.querySelectorAll(".update-btn").forEach((elem) => {
    elem.addEventListener("click", async () => {
      const closestLi = elem.closest("li");
      const contactID = closestLi?.dataset._id;

      hideContactList();
      displayForm();
      const response = await sendHttpRequest("GET", null, contactID);
      const data = response.data;
      fillFromSaved(data);
    });
  });
}

function listenToContactEvents() {
  if (CONTACTS_LIST) {
    listenToDeleteContact(CONTACTS_LIST);
    listenToUpdateContact(CONTACTS_LIST);
  }
}
