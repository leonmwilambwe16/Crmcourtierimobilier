import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import "../../styles/page.styles/Message.scss";

const ClientMessages: React.FC = () => {
  const { user, getConversations, sendMessage } = useAuth();
  const location = useLocation();
  const courtier = location.state?.courtier;

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !courtier) return;
    getConversations(user.id).then((data) => {
      if (data.messages) setMessages(data.messages);
    });
  }, [user, courtier]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const response = await sendMessage(courtier._id, newMessage);
    if (response.success) {
      setMessages((prev) => [...prev, { sender: user.id, content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="message-page">
      <div className="message-header">
        {courtier ? (
          <div className="courtier-info">
            <img src={courtier.picture || "/default.png"} alt={courtier.firstName} />
            <h3>{courtier.firstName} {courtier.lastName}</h3>
          </div>
        ) : <h3>Conversation</h3>}
      </div>

      <div className="message-body">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.sender === user?.id ? "me" : "courtier"}`}>
            <p>{m.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ClientMessages;
