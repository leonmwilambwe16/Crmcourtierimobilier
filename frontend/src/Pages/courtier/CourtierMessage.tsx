import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const CourtierMessages = () => {
  const { getConversations, user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState("");

  const clientId = user?.selectedClientId; // <<< USE A REAL CLIENT ID

  useEffect(() => {
    if (!clientId) {
      setError("No client selected.");
      return;
    }

    getConversations(clientId)
      .then(data => {
        if (!data || !data.messages) {
          setError("No messages found.");
          return;
        }

        setMessages(data.messages);
      })
      .catch(() => setError("Failed to load messages."));
  }, [clientId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="messages-page">
      <h1>Messages with client</h1>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((m, i) => (
            <li key={i}>
              <strong>{m.sender === user?.id ? "Me" : "Client"}:</strong> {m.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourtierMessages;
