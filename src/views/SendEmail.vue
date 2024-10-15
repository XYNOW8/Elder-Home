<template>
  <div class="email-form-container">
    <h1>Send Email</h1>

    <!-- Email Form -->
    <form @submit.prevent="sendEmail">
      <p>
        <input
          type="text"
          v-model="toEmails"
          placeholder="Recipient Emails (semicolon separated)"
          required
        />
      </p>
      <p>
        <input type="text" v-model="subject" placeholder="Subject" required />
      </p>
      <p>
        <textarea v-model="message" placeholder="Message" required></textarea>
      </p>
      <p>
        <input type="file" @change="handleFileChange" />
      </p>
      <p>
        <button type="submit">Send Email</button>
      </p>

      <!-- Display success or error message with transition -->
      <transition name="fade">
        <p v-if="statusMessage" :class="{ success: isSuccess, error: !isSuccess }">{{ statusMessage }}</p>
      </transition>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Form data
const toEmails = ref(''); // Multiple emails as comma-separated string
const subject = ref('');
const message = ref('');
const statusMessage = ref('');
const isSuccess = ref(false);
const selectedFile = ref(null);
const fileBase64 = ref('');
// Firebase Cloud Functions reference
const functionsInstance = getFunctions();

// Handle file change and convert to base64
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileBase64.value = reader.result.split(',')[1]; // Remove base64 prefix
      selectedFile.value = file;
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  }
};

// Clear form fields
const clearForm = () => {
  toEmails.value = '';
  subject.value = '';
  message.value = '';
  selectedFile.value = null;
  fileBase64.value = '';
  document.querySelector('input[type="file"]').value = '';
};

// Clear status message after 5 seconds
const clearStatusMessage = () => {
  setTimeout(() => {
    statusMessage.value = '';
    isSuccess.value = false;
  }, 5000);
};

// Send email to multiple recipients
const sendEmail = async () => {
  let emailList = null;
  try {
    emailList = toEmails.value.split(';').map(email => email.trim()); // Split the emails by commas and trim spaces
  } catch (error) {
    statusMessage.value = `Invalid Email list(Must be separated by semicolon.`;
    isSuccess.value = false;
    return;
  }


  try {
    const sendEmailFunction = httpsCallable(functionsInstance, 'sendEmail'); // Call the Cloud Function

    // Loop through each email and send the email
    for (const email of emailList) {
      const result = await sendEmailFunction({
        toEmail: email,
        subject: subject.value,
        message: message.value,
        attachment: fileBase64.value,
        attachmentName: selectedFile.value ? selectedFile.value.name : '',
      });

      if (!result.data.success) {
        throw new Error(`Failed to send to ${email}`);
      }
    }

    statusMessage.value = 'Emails sent successfully!';
    isSuccess.value = true;
    clearForm();
    clearStatusMessage();
  } catch (error) {
    statusMessage.value = `Failed to send email: ${error.message}`;
    isSuccess.value = false;
    clearStatusMessage();
  }
};
</script>

<style scoped>
/* Basic styling */
.email-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}

input, textarea {
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
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

.success {
  color: green;
}

.error {
  color: red;
}
</style>
