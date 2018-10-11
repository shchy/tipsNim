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
    AUTH_REQUEST: {},
    AUTH_SUCCESS: { token: string },
    AUTH_ERROR: {},
    AUTH_LOGOUT: {}
}

export interface AuthActions {
    AUTH_LOGOUT: {},
    AUTH_REQUEST: { id: string, password: string },
}