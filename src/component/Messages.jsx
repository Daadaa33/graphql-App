import React from "react";

function Messages() {
  return (
    <div id="chat-container">
      <div id="message-list">
        <div class="message">
          <span class="user">User1:</span> Hello there!
        </div>
        <div class="message">
          <span class="user">User2:</span> Hi! How can I help you?
        </div>
      </div>
      <div id="input-container">
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
        />
        <button id="send-button">Send</button>
      </div>
    </div>
  );
}

export default Messages;
