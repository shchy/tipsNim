
function getToken(id: string, password: string) {
    console.log(id);
    console.log(password);
    return fetch("/api/v1/auth/token", { method: "POST" })
        .then(resp => {
            if (!resp.ok) {
                return Promise.reject(resp);
            }
            return resp.text();
        })
        .catch(ex => {
            console.log(ex);
            throw ex;
        });
}

export default getToken;
