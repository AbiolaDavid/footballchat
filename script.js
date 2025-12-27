body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: #007bff;
  text-align: center;
  padding: 15px;
}

header h1 {
  margin: 0;
  font-size: 1.8em;
}

.main-container {
  flex: 1;
  padding: 10px;
}

.video-section {
  width: 100%;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 80%; /* Tall immersive ratio for mobile */
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.chat-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 300px;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.chat-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

#messages {
  flex: 1;
  list-style: none;
  padding: 10px;
  margin: 0 0 10px 0;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  max-height: calc(70% - 60px);
}

#messages li {
  margin-bottom: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9em;
  backdrop-filter: blur(4px);
  word-wrap: break-word;
}

#message-form {
  display: flex;
}

#message-input {
  flex: 1;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px 0 0 20px;
  color: white;
  font-size: 0.95em;
}

#message-form button {
  padding: 10px 15px;
  background: #007bff;
  border: none;
  border-radius: 0 20px 20px 0;
  color: white;
  font-size: 0.95em;
}

.stream-tip {
  text-align: center;
  margin: 15px 0;
  padding: 10px;
  background: rgba(255, 165, 0, 0.2);
  border: 1px solid #ff9800;
  border-radius: 8px;
  font-weight: bold;
}

.chat-prompt {
  text-align: center;
  margin: 20px 0;
  font-size: 1.1em;
  font-weight: bold;
}

.google-signin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 15px auto;
  height: 50px;
  background: #fff;
  color: #757575;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
}

.google-signin-btn:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.3);
}

.logout-btn {
  display: none;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  padding: 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
}

.alternative-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.alt-button {
  padding: 12px 20px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1em;
  min-width: 100px;
  text-align: center;
}

.alt-button:hover {
  background: #218838;
}

footer {
  background: #111;
  text-align: center;
  padding: 15px;
  font-size: 0.9em;
}

footer a {
  color: #aaa;
  text-decoration: none;
}

/* Desktop Adjustments */
@media (min-width: 769px) {
  .video-container {
    max-width: 80%;
    margin: 0 auto 30px auto;
    padding-bottom: 55%; /* Moderate 16:9-ish height */
  }

  .chat-overlay {
    width: 350px;
    left: 20px;
    bottom: 20px;
  }

  .stream-tip, .chat-prompt, .google-signin-btn, .logout-btn, .alternative-links {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Mobile Fallback for Overlay */
@media (max-width: 768px) {
  .chat-overlay {
    position: static;
    width: 100%;
    max-height: none;
    padding: 10px;
    background: rgba(0, 0, 0, 0.7);
    opacity: 1; /* Always visible on small screens if signed in */
  }
}
