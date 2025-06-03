// chat.js

const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// Helper: append a message bubble
function appendMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("message", sender); // "message shirley" or "message user"
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight; // scroll to bottom
}

// Shirley’s initial greeting (only once!)
function addInitialMessage() {
  const greeting = "Hello! I'm Shirley, your career support assistant. How can I help you today?";
  appendMessage(greeting, "shirley");
}

// Send button toggling
chatInput.addEventListener("input", () => {
  sendBtn.disabled = chatInput.value.trim() === "";
});

// When user presses “Send” or hits Enter
function sendUserMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  chatInput.value = "";
  sendBtn.disabled = true;

  // Call your API / LLM here, then append Shirley’s reply
  fetch("https://your‐openai‐endpoint.example.com/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: text })
  })
    .then((resp) => resp.json())
    .then((data) => {
      appendMessage(data.answer, "shirley");
    })
    .catch(() => {
      appendMessage("Sorry, something went wrong. Please try again later.", "shirley");
    });
}

sendBtn.addEventListener("click", sendUserMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && chatInput.value.trim()) {
    e.preventDefault();
    sendUserMessage();
  }
});

// Only a single initial call here:
document.addEventListener("DOMContentLoaded", () => {
  addInitialMessage();
  // ← Make sure there's only ONE call to addInitialMessage()
});
