<template>
  <div class="auth-container">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <button :disabled="loading" @click="register">Register & Login</button>
    </p>

    <transition name="fade">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/init'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')
const loading = ref(false)

const register = () => {
  errorMessage.value = ''
  loading.value = true // Set loading state

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!')
      // Now sign in with the same credentials
      return signInWithEmailAndPassword(auth, email.value, password.value)
    })
    .then(async () => {
      console.log('User automatically logged in after registration')

      const user = auth.currentUser
      const idTokenResult = await user.getIdTokenResult()

      const isAdmin = idTokenResult.claims.admin

      if (isAdmin) {
        await router.push('/admin')
      } else {
        await router.push('/')
      }
    })
    .catch((error) => {
      errorMessage.value = getErrorMessage(error.code)
    })
    .finally(() => {
      loading.value = false
    })
}

// Helper function to convert Firebase error codes to friendly messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use.'
    case 'auth/invalid-email':
      return 'The email address is not valid.'
    case 'auth/weak-password':
      return 'The password is too weak.'
    default:
      return 'An error occurred. Please try again.'
  }
}
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
