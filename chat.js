// chat.js

document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  // Enable Send button only when there is text
  chatInput.addEventListener("input", () => {
    sendBtn.disabled = chatInput.value.trim().length === 0;
  });

  // Helper to scroll chat to bottom
  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Helper to append a message bubble
  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    scrollToBottom();
  }

  // Send button click handler
  sendBtn.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // 1. Append user bubble
    appendMessage(userText, "user");
    chatInput.value = "";
    sendBtn.disabled = true; // wait for next input

    // 2. Send to back end
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { reply } = await response.json();

      // 3. Append Shirley’s bubble
      appendMessage(reply, "shirley");
    } catch (err) {
      console.error("Error calling chat API:", err);
      appendMessage(
        "Sorry, something went wrong. Please try again later.",
        "shirley"
      );
    }
  });

  // Also send on Enter key (while not Shift+Enter)
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !sendBtn.disabled) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // Greet the user with a short welcome message from Shirley
  appendMessage(
    "Hello! I’m Shirley, your career support assistant. How can I help you today?",
    "shirley"
  );
});
