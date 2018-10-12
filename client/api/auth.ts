
function getToken(user: { id: string, password: string }) {
    console.log(user.id);
    console.log(user.password);
    return fetch("/api/v1/auth/token", { method: "POST" })
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

function getMe() {
    return fetch("/api/v1/auth/token", { method: "POST" })
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
