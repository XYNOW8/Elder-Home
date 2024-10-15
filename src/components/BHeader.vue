<template>
  <div class="container">
    <header class="d-flex justify-content-between py-3">
      <!-- Display logged-in user's email on the left -->
      <div v-if="userEmail" class="user-email">{{ userEmail }}</div>

      <!-- Navigation menu on the right -->
      <ul class="nav nav-pills">
        <li v-if="!isAdmin || !isLoggedIn" class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/email" class="nav-link" active-class="active">Email Us</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/table" class="nav-link" active-class="active">Table</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/map" class="nav-link" active-class="active">Map</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/csv" class="nav-link" active-class="active">CSV Exporter</router-link>
        </li><li v-if="isLoggedIn" class="nav-item">
        <router-link to="/chat" class="nav-link" active-class="active">Chat Bot</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase/init.js';

export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      userEmail: null,
    };
  },
  created() {
    // Listen for Firebase Authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.isAdmin = user.email === 'admin@123.com';
        this.userEmail = user.email;
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.userEmail = null;
      }
    });
  },
  methods: {
    logout() {
      // Confirmation prompt before logout
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        signOut(auth)
          .then(() => {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.userEmail = null;
            this.$router.push('/'); // Redirect to home after logout
          })
          .catch((error) => {
            console.error("Error during sign out:", error);
          });
      }
    }
  }
};
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
  inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
