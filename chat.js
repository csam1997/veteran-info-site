// chat.js

// Grab references to DOM elements
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

//──────────────────────────────────────────────────────────────────────────────
// Helper: Create and append a chat bubble
//   `text` is the message string
//   `sender` is either "shirley" or "user"
//──────────────────────────────────────────────────────────────────────────────
function appendMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("message", sender); // message.shirley or message.user
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  // Scroll to the bottom whenever a new message appears
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

//──────────────────────────────────────────────────────────────────────────────
// Shirley’s initial greeting (only called once on page load)
//──────────────────────────────────────────────────────────────────────────────
function addInitialMessage() {
  const greeting =
    "Hello! I’m Shirley, your career support assistant. How can I help you today?";
  appendMessage(greeting, "shirley");
}

//──────────────────────────────────────────────────────────────────────────────
// Enable or disable the Send button based on input field contents
//──────────────────────────────────────────────────────────────────────────────
chatInput.addEventListener("input", () => {
  sendBtn.disabled = chatInput.value.trim() === "";
});

//──────────────────────────────────────────────────────────────────────────────
// When the user clicks “Send” or presses Enter (without Shift), send their message
//──────────────────────────────────────────────────────────────────────────────
function sendUserMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  // 1. Append user’s bubble
  appendMessage(userText, "user");

  // 2. Clear input and disable button until new text is typed
  chatInput.value = "";
  sendBtn.disabled = true;

  // 3. Call the LLM / backend API (placeholder URL) to get Shirley’s reply
  fetch("https://your‐openai‐endpoint.example.com/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: userText })
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Network response was not ok");
      return resp.json();
    })
    .then((data) => {
      // Assume the API returns JSON like { answer: "Shirley’s response text" }
      appendMessage(data.answer, "shirley");
    })
    .catch((err) => {
      console.error("Error fetching Shirley’s response:", err);
      appendMessage(
        "Sorry, something went wrong. Please try again later.",
        "shirley"
      );
    });
}

// Click handler for the Send button
sendBtn.addEventListener("click", sendUserMessage);

// Allow pressing Enter (without Shift) to send the message as well
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && chatInput.value.trim()) {
    e.preventDefault();
    sendUserMessage();
  }
});

//──────────────────────────────────────────────────────────────────────────────
// On page load, show Shirley’s initial greeting exactly once
//──────────────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  addInitialMessage();
});
