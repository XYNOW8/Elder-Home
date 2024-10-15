// src/store/store.js
import { createStore } from 'vuex';
import { auth } from '../firebase/init'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

export default createStore({
  state: {
    isLoggedIn: false,
    email: null
  },
  mutations: {
    setUser(state, email) {
      state.isLoggedIn = true;
      state.email = email;
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.email = null;
    }
  },
  actions: {
    initAuthState({ commit }) {
      onAuthStateChanged(auth, user => {
        if (user) {
          commit('setUser', user.email);
        } else {
          commit('clearUser');
        }
      });
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit('clearUser');
      });
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    getEmail: state => state.email
  }
});
