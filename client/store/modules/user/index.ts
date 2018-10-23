import Vue from 'vue';
import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper'
import authApi from "../../../api/auth";
import { UserState, UserGetters, UserMutations, UserActions } from "./if"
import { AuthActions } from "../auth/if"





const state: UserState = { status: '', profile: { name: '' } }

const getters: DefineGetters<UserGetters, UserState> = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name,
}

const mutations: DefineMutations<UserMutations, UserState> = {
    USER_REQUEST: state => {
        state.status = 'loading'
    },
    USER_SUCCESS: (state, resp) => {
        state.status = 'success'
        Vue.set(state, 'profile', resp)
    },
    USER_ERROR: state => {
        state.status = 'error'
    },
    AUTH_LOGOUT: state => {
        state.profile = { name: '' }
    }
}

const actions: DefineActions<UserActions, UserState, UserMutations, UserGetters, AuthActions> = {
    USER_REQUEST: async ({ commit, dispatch, getters }) => {
        commit('USER_REQUEST', {})
        await authApi.getMe(getters.getProfile.name)
            .then(resp => {
                commit('USER_SUCCESS', resp)
            })
            .catch(err => {
                commit('USER_ERROR', {})
                // if resp is unauthorized, logout, to
                dispatch('AUTH_LOGOUT', {})
                throw err
            })
    },
}



export default {
    state,
    getters,
    actions,
    mutations,
}