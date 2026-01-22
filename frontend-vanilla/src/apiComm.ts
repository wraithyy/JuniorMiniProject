const API_URL = 'http://localhost:3333/api/contacts';
export async function sendHttpRequest(method: string) {
  try{
      const response = await fetch(API_URL, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then(errData => {
        console.log(errData);
        throw new Error('Something went wrong - server side')
      });
    }
  } catch (error){
    console.warn('issues catching the response')
  }
}