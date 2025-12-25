// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGVQc5OP4k9AXlkK6Ld98yvBmODuc0d60",
  authDomain: "chatapp-5afff.firebaseapp.com",
  databaseURL: "https://chatapp-5afff-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "chatapp-5afff",
  storageBucket: "chatapp-5afff.firebasestorage.app",
  messagingSenderId: "835710769608",
  appId: "1:835710769608:web:ae974aeab8745fdea848fd",
  measurementId: "G-V6BH65CXV5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Reference to the 'messages' node
const messagesRef = database.ref("messages");

// Google Sign-In Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Elements
const signInButton = document.getElementById("google-signin");
const logoutButton = document.getElementById("logout");
const messagesList = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// Handle Sign-In
signInButton.addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Signed in:", result.user.displayName);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
});

// Handle Logout
logoutButton.addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      console.log("Signed out");
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
});

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    signInButton.style.display = "none";
    logoutButton.style.display = "block";
    messagesList.style.display = "block";
    messageForm.style.display = "flex";

    // Send message on form submit
    messageForm.addEventListener("submit", sendMessage); // Attach listener only once

    // Listen for messages
    messagesRef.on("child_added", addMessageToUI);
  } else {
    // User is signed out
    signInButton.style.display = "block";
    logoutButton.style.display = "none";
    messagesList.style.display = "none";
    messageForm.style.display = "none";

    // Clear messages and remove listeners
    messagesList.innerHTML = "";
    messagesRef.off("child_added", addMessageToUI);
    messageForm.removeEventListener("submit", sendMessage);
  }
});

// Function to send message
function sendMessage(e) {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    const user = auth.currentUser;
    messagesRef.push({
      username: user.displayName,
      uid: user.uid, // Add UID for security
      message: message,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
}

// Function to add message to UI
function addMessageToUI(snapshot) {
  const data = snapshot.val();
  const messageElement = document.createElement("li");
  messageElement.textContent = `${data.username}: ${data.message}`;
  messagesList.appendChild(messageElement);
  messagesList.scrollTop = messagesList.scrollHeight;
}