
// import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
// import { USER_REQUEST } from '../actions/user'
import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper'
import authApi from "../../../api/auth";
import { AuthState, AuthGetters, AuthMutations, AuthActions } from "./if"
import { UserActions } from "../user/if"


const state: AuthState = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
}

const getters: DefineGetters<AuthGetters, AuthState> = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const mutations: DefineMutations<AuthMutations, AuthState> = {
    AUTH_REQUEST: (state) => {
        state.status = 'loading'
    },
    AUTH_SUCCESS: (state, resp) => {
        state.status = 'success'
        state.token = resp.token
        state.hasLoadedOnce = true
    },
    AUTH_ERROR: (state) => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    AUTH_LOGOUT: (state) => {
        state.token = ''
    }
}

const actions: DefineActions<AuthActions, AuthState, AuthMutations, AuthGetters> = {
    AUTH_REQUEST: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST', null)
            authApi.getToken(user)
                // apiCall({ url: 'auth', data: user, method: 'POST' })
                .then(resp => {
                    localStorage.setItem('user-token', resp.token)
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    // axios.defaults.headers.common['Authorization'] = resp.token
                    commit('AUTH_SUCCESS', resp)
                    dispatch<Dispatcher<UserActions>>({ type: 'USER_REQUEST' }) // todo how to get other module dispacher
                    resolve(resp)
                })
                .catch(err => {
                    commit('AUTH_ERROR', err)
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_LOGOUT', null)
            localStorage.removeItem('user-token')
            resolve()
        })
    }
}



export default {
    state,
    getters,
    actions,
    mutations,
}