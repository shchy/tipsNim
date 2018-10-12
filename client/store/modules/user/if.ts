export interface UserState {
    status: string,
    profile: { name: string }
}
export interface UserGetters {
    getProfile: { name: string },
    isProfileLoaded: boolean,
}
export interface UserMutations {
    USER_REQUEST: null,
    USER_SUCCESS: { resp: { name: string } },
    USER_ERROR: null,
    AUTH_LOGOUT: null,
}
export interface UserActions {
    USER_REQUEST: null,
}