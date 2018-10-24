
function getToken(user: { id: string, password: string }) {  
    return fetch("/api/v1/auth/token", 
    { 
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(user) 
    })
        .then(resp => {
            if (!resp.ok) {
                return Promise.reject(resp);
            }
            return resp.json();
        })
        .catch(ex => {
            console.log(ex);
            throw ex;
        });
}

function getMe(id: string) {
    return fetch("/api/v1/auth/me", { method: "GET" })
        .then(resp => {
            if (!resp.ok) {
                return Promise.reject(resp);
            }
            return resp.json();
        })
        .catch(ex => {
            console.log(ex);
            throw ex;
        });
}

export default {
    getToken: getToken,
    getMe: getMe
};
