<template>
  <div class="chatbot-container">
    <h2>AI Chatbot</h2>
    <div class="chat-log">
      <div v-for="(message, index) in chatLog" :key="index" :class="message.type">
        <strong>{{ message.type === 'user' ? 'You' : 'Bot' }}:</strong> {{ message.content }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="userInput" type="text" placeholder="Ask me anything..." required />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getFunctions, httpsCallable } from 'firebase/functions';

// State variables
const userInput = ref('');
const chatLog = ref([]);

// Firebase Cloud Functions instance
const functionsInstance = getFunctions();

// Function to send user message and get OpenAI response via Firebase Cloud Function
const sendMessage = async () => {
  chatLog.value.push({ type: 'user', content: userInput.value });

  try {
    const getOpenAIResponse = httpsCallable(functionsInstance, 'getOpenAIResponse');
    const result = await getOpenAIResponse({ prompt: userInput.value });

    chatLog.value.push({ type: 'bot', content: result.data.response });
  } catch (error) {
    chatLog.value.push({ type: 'bot', content: 'Error communicating with the AI. Please try again later.' });
  }

  userInput.value = '';
};
</script>

<style scoped>
/* Basic chatbot styling */
.chatbot-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
}

.chat-log {
  height: 300px;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.chat-log div {
  margin-bottom: 10px;
}

form {
  display: flex;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
