const admin = require("firebase-admin");
const functions = require("firebase-functions");
const fs = require("fs");
const path = require("path");
const { post } = require("axios");
const { OpenAI } = require("openai");

admin.initializeApp();

// Assign user roles using Firebase Functions v1
exports.assignUserRole = functions.auth.user().onCreate(async (user) => {
  const email = user.email;

  if (email === "admin@123.com") {
    await admin.auth().setCustomUserClaims(user.uid, { role: "admin" });
  } else {
    await admin.auth().setCustomUserClaims(user.uid, { role: "user" });
  }
});

// Cloud Function to send an email using EmailJS
exports.sendEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const serviceID = "service_6esikhn";
  const templateID = "template_hkait0w";
  const publicKey = "pz7cUM7xRazIbNA1J";

  const templateParams = {
    from_email: context.auth.token.email,
    to_email: data.toEmail,
    subject: data.subject,
    message: data.message,
    attachment: data.attachment,
    attachment_name: data.attachmentName,
  };

  try {
    const response = await post(`https://api.emailjs.com/api/v1.0/email/send`, {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: templateParams,
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Error sending email", error.message);
  }
});

// Define paths to the local JSON files
const usersFilePath = path.join(__dirname, "mock_data", "users.json");
const productsFilePath = path.join(__dirname, "mock_data", "products.json");

// Cloud Function to fetch users data
exports.getUsers = functions.https.onCall(() => {
  try {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Failed to fetch users data", error.message);
  }
});

// Cloud Function to fetch products data
exports.getProducts = functions.https.onCall(() => {
  try {
    return JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Failed to fetch products data", error.message);
  }
});

// Initialize the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// Cloud Function to handle OpenAI requests
exports.getOpenAIResponse = functions.https.onRequest(async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-4o",
      prompt: prompt,
      max_tokens: 150
    });
    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interacting with OpenAI");
  }
});