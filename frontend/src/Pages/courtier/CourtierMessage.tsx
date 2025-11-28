import { useState, useRef, useEffect } from "react";
import "../../styles/page.styles/Message.scss";

interface Message {
  sender: string;
  content: string;
  timestamp?: string;
}

interface Client {
  id: string;
  name: string;
  picture?: string;
}

export default function CourtierMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Example client
  const client: Client = { id: "1", name: "Alice Smith", picture: "/placeholder.jpg" };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "me", content: newMessage, timestamp: new Date().toLocaleTimeString() },
    ]);
    setNewMessage("");
  };

  return (
    <div className="message-page">
      {/* Header */}
      <div className="message-header">
        <div className="courtier-info">
          <img src={client.picture} alt={client.name} />
          <h3>{client.name}</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="message-body">
        {messages.length === 0 && <p className="no-messages">No messages yet.</p>}

        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.sender === "me" ? "me" : "client"}`}>
            <p>{m.content}</p>
            {m.timestamp && <span className="timestamp">{m.timestamp}</span>}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
}
