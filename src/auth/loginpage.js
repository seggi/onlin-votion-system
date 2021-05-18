import { createAuthProvider } from 'react-token-auth'

const offlineUrl = "localhost:5000/auth/ovs/refresh";

export const [ useAuth, authFetch, login, logout] = 
    createAuthProvider({
        accessTokenExpireKey: 'accessToken',
        onUpdateToken: (token) =>  fetch(offlineUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json", 
            },
            body: token.refreshToken
        })
        .then(rsp=> rsp.json())
    });

    