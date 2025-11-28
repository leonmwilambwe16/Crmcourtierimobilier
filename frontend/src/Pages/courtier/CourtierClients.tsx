import { useState } from "react";
import "../../styles/page.styles/Clients.scss";

interface Client {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export default function CourtierClients() {
  const [clients] = useState<Client[]>([
    { id: "1", name: "Alice Smith", email: "alice@example.com", picture: "/placeholder.jpg" },
    { id: "2", name: "Bob Johnson", email: "bob@example.com", picture: "/placeholder.jpg" },
    { id: "3", name: "Charlie Lee", email: "charlie@example.com", picture: "/placeholder.jpg" },
  ]);

  return (
    <div className="clients-page">
      <h1>My Clients</h1>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            <div className="client-info">
              <img src={c.picture} alt={c.name} />
              <div className="client-details">
                <h3>{c.name}</h3>
                <p>{c.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
