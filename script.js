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

// DOM Elements
const signInButton = document.getElementById("google-signin");
const logoutButton = document.getElementById("logout");
const messagesList = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const chatOverlay = document.getElementById("chat-overlay");
const chatPrompt = document.querySelector(".chat-prompt");

// Handle Sign-In
signInButton.addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Signed in:", result.user.displayName);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
      alert("Sign-in failed. Please try again.");
    });
});

// Handle Logout
logoutButton.addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
});

// Send message function
function sendMessage(e) {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message && auth.currentUser) {
    messagesRef.push({
      username: auth.currentUser.displayName || "Anonymous",
      uid: auth.currentUser.uid,
      message: message,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
}

// Add message to UI
function addMessageToUI(snapshot) {
  const data = snapshot.val();
  const messageElement = document.createElement("li");
  messageElement.textContent = `${data.username}: ${data.message}`;
  messagesList.appendChild(messageElement);
  
  // Auto-scroll to latest message
  messagesList.scrollTop = messagesList.scrollHeight;
}

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    signInButton.style.display = "none";
    logoutButton.style.display = "block";
    chatPrompt.style.display = "none";
    
    // Show and activate chat overlay
    chatOverlay.classList.add("visible");

    // Attach event listeners (only once)
    messageForm.addEventListener("submit", sendMessage);
    messagesRef.on("child_added", addMessageToUI);

  } else {
    // User is signed out
    signInButton.style.display = "flex";  // flex to match button's internal layout
    logoutButton.style.display = "none";
    chatPrompt.style.display = "block";
    
    // Hide and deactivate chat overlay
    chatOverlay.classList.remove("visible");

    // Clear messages
    messagesList.innerHTML = "";

    // Remove listeners to prevent duplicates/memory leaks
    messagesRef.off("child_added", addMessageToUI);
    messageForm.removeEventListener("submit", sendMessage);
  }
});
