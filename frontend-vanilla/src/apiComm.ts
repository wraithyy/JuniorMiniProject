const API_URL = 'http://localhost:3333/api/contacts';
export async function sendHttpRequest(method: string, data: object | null = null) {
    try {
        let response;
        if (data === null){
            response = await fetch(API_URL, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            response = await fetch(API_URL, {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then(errData => {
                console.log(errData);
                throw new Error('Something went wrong - server side')
            });
        }
    } catch (error) {
        throw(error);
    }
}