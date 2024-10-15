<template>
  <div class="auth-container">
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <button @click="signIn">Sign in via Firebase</button>
    </p>

    <transition name="fade">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/init'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const signIn = () => {
  errorMessage.value = ''
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async () => {
      const user = auth.currentUser;
      const idTokenResult = await user.getIdTokenResult();

      const isAdmin = idTokenResult.claims.admin;

      if (isAdmin) {
        await router.push('/admin');
      } else {
        await router.push('/');
      }
    })
    .catch((error) => {
      errorMessage.value = getErrorMessage(error.code);
    });
}

// Helper function to convert Firebase error codes to friendly messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'The password is incorrect.';
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  text-align: center;
}

/* Center form elements */
input, button {
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
}

/* Button style */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background-color: #0056b3;
}

/* Basic styles */
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Error message styles */
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}

</style>
