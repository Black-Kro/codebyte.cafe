import { Module } from 'vuex';
import { useAxios } from '/@app/composables/';

import firebase from 'firebase/app';
import 'firebase/auth';

const { get } = useAxios();

interface AuthenticationModuleState {
    user: any;
    error: any;
    status: string;
}

export const AuthProviders = {
    GOOGLE: new firebase.auth.GoogleAuthProvider,
    GITHUB: new firebase.auth.GithubAuthProvider,
    TWITTER: new firebase.auth.TwitterAuthProvider,
}

export const AuthenticationModule: Module<AuthenticationModuleState, any> = {
    namespaced: true,
    state: {
        user: null,
        status: 'PENDING',
        error: null,
    },
    getters: {
        user(state) {
            return state.user;
        },

        isAuthenticated(state) {
            return !!state.user;
        },

        status(state) {
            return state.status;
        },

        error(state) {
            return state.error;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setStatus(state, payload) {
            state.status = payload;
        }
    },
    actions: {
        init({ commit }) {
            firebase
                .auth()
                .onIdTokenChanged(user => {
                    if (user) {
                        commit('setUser', user);
                        
                        if (localStorage.getItem('codebyte-profile-created')) {
                            commit('setStatus', 'AUTHENTICATED');
                        } else {
                            // Check if the profile has been created yet.
                            get('/api/user/status')
                                .then(response => {
                                    const { data } = response;
                                    if (!data.profileCreated) {
                                        commit('setStatus', 'INCOMPLETE');
                                    } else {
                                        commit('setStatus', 'AUTHENTICATED');
                                        localStorage.setItem('codebyte-profile-created', 'true');
                                    }
                                })
                                .catch(error => {
                                    commit('setStatus', 'UNAUTHENTICATED');
                                });
                        }

                    }
                    else {
                        commit('setUser', null);
                        commit('setStatus', 'UNAUTHENTICATED');
                    }
                });
        },

        signIn({ commit }, { email, password, provider }) {
            if (provider) {
                return firebase
                    .auth()
                    .signInWithPopup(AuthProviders[provider])
                    .then(response => { commit('setUser', response.user); commit('setError', null); })
                    .catch(error => { commit('setError', error.message); console.log(error); });
            } else {
                if (email && password) {
                    return firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(response => {
                            commit('setUser', response.user);
                            commit('setError', null);
                        })
                        .catch((error) => {
                            console.error(error.message)
                        })
                } else {
                    const error = `[Authentication Module] No provider or username and password provided. Please provide one or the other to complete user sign in.`;
                    commit('setError', error);
                    console.error(error);
                }
            }
        },

        signUp({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(response => { commit('setUser', response.user); commit('setError', null); })
                .catch(error => { commit('setError', error.message); })
        },

        signOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    localStorage.removeItem('codebyte-profile-created');
                    // To ensure we clear all the data from the window, reload the page.
                    location.reload();

                })
                .catch(error => commit('setError', error.message));
        },
    }
}
