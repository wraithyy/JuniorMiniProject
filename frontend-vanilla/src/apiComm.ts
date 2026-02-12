const API_URL = "http://localhost:3333/api/contacts";

function completeUrl(url: string, contact_id: string): string {
  if (contact_id) {
    url += `/${encodeURIComponent(contact_id)}`;
  }
  return url;
}

export async function sendHttpRequest(
  method: string,
  data: object | null = null,
  contact_id = ""
) {
  const api_url = completeUrl(API_URL, contact_id);
  try {
    let response;
    if (data === null) {
      response = await fetch(api_url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch(api_url, {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    return response.json().then((errData) => {
      console.log(errData);
      throw new Error(errData.message || "Something went wrong - server side!");
    });
  } catch (error) {
    throw error;
  }
}
