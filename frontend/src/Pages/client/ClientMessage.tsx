import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/page.styles/Message.scss"

interface Message {
  sender: string;
  content: string;
  timestamp?: string;
}

const ClientMessages: React.FC = () => {
  const { getConversations, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    getConversations(user.id).then((data) => {
      if (Array.isArray(data)) setMessages(data);
      else if (data.messages) setMessages(data.messages);
    });
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: user?.id || "me", content: newMessage },
    ]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="gmail-chat-page">
      <div className="chat-container">
        {/* Chat header */}
        <div className="chat-header">
          <h3>Chat with Courtier</h3>
        </div>

        {/* Messages area */}
        <div className="chat-window">
          {messages.length === 0 && (
            <p className="no-messages">No messages yet.</p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-message ${
                m.sender === user?.id ? "me" : "courtier"
              }`}
            >
              <p>{m.content}</p>
              {m.timestamp && <span className="timestamp">{m.timestamp}</span>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ClientMessages;
