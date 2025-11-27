import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import "../../styles/page.styles/Message.scss";

interface Message {
  sender: string;
  content: string;
  timestamp?: string;
}

const ClientMessages: React.FC = () => {
  const { getConversations, user } = useAuth();
  const location = useLocation();
  const courtier = location.state?.courtier;

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

  return (
    <div className="message-page">

      {/* Header like dashboard-navbar UI */}
      <div className="message-header">
        {courtier ? (
          <div className="courtier-info">
            <img src={courtier.picture} alt={courtier.name} />
            <h3>{courtier.name}</h3>
          </div>
        ) : (
          <h3>Conversation</h3>
        )}
      </div>

      {/* MESSAGES */}
      <div className="message-body">
        {messages.length === 0 && <p className="no-messages">No messages yet.</p>}

        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.sender === user?.id ? "me" : "courtier"}`}>
            <p>{m.content}</p>
            {m.timestamp && <span className="timestamp">{m.timestamp}</span>}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ClientMessages;
