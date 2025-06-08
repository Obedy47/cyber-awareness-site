<script>
  // Function to toggle the chatbot visibility
  function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  }

  // Function to send a message
  async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message === "") return;

    // Append the user message
    appendMessage('user', message);
    input.value = ""; // Clear input field

    // Display "Typing..." while awaiting bot response
    appendMessage('bot', "Typing...");

    try {
      // Make an API call to the backend to get bot reply
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      const botReply = data.reply;

      // Remove the "Typing..." message and append the bot's reply
      removeLastBotMessage();
      appendMessage('bot', botReply);
    } catch (err) {
      // Handle errors and show a fallback message
      removeLastBotMessage();
      appendMessage('bot', "Something went wrong. Please try again.");
    }
  }

  // Function to append messages to the chat
  function appendMessage(sender, text) {
    const messages = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
  }

  // Function to remove the last bot message (e.g., the "Typing..." message)
  function removeLastBotMessage() {
    const messages = document.getElementById('chatbot-messages');
    const lastMessage = messages.lastChild;
    if (lastMessage && lastMessage.classList.contains('bot-message')) {
      messages.removeChild(lastMessage);
    }
  }

  // Allow the Enter key to send the message
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("chatbot-input").addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendChatMessage();
    });
  });
</script>