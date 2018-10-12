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

const actions: DefineActions<UserActions, UserState, UserMutations, UserGetters> = {
    USER_REQUEST: ({ commit, dispatch }) => {
        commit('USER_REQUEST', null)
        authApi.getMe()
            .then(resp => {
                commit('USER_SUCCESS', resp)
            })
            .catch(resp => {
                commit('USER_ERROR', null)
                // if resp is unauthorized, logout, to
                dispatch('AUTH_LOGOUT', null)
            })
    },
}



export default {
    state,
    getters,
    actions,
    mutations,
}