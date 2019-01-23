export interface UserState {
    status: string,
    profile: { name: string }
}
export interface UserGetters {
    getProfile: { name: string },
    isProfileLoaded: boolean,
}
export interface UserMutations {
    USER_REQUEST: {},
    USER_SUCCESS: { name: string },
    USER_ERROR: {},
    AUTH_LOGOUT: {},
}
export interface UserActions {
    USER_REQUEST: {},
}