import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const ClientMessages = () => {
  const { getConversations, user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // client should send their own ID
    getConversations(user.id).then(data => {
      // some APIs return {messages: [...]}
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (data.messages) {
        setMessages(data.messages);
      }
    });
  }, [user]);

  return (
    <div className="messages-page">
      <h1>Messages</h1>

      {messages.length === 0 && <p>No messages yet.</p>}

      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.sender === user?.id ? "Me" : "Courtier"}:</strong>{" "}
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientMessages;
