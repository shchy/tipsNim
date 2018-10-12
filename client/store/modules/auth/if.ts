export interface AuthState {
    token: string,
    status: string,
    hasLoadedOnce: boolean,
}

export interface AuthGetters {
    isAuthenticated: boolean,
    authStatus: string,
}
export interface AuthMutations {
    AUTH_REQUEST: null,
    AUTH_SUCCESS: { token: string },
    AUTH_ERROR: null,
    AUTH_LOGOUT: null
}
export interface AuthActions {
    AUTH_REQUEST: { id: string, password: string },
    AUTH_LOGOUT: null,
}