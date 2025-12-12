import React, { useEffect, useState } from "react";
import "../../styles/page.styles/Clients.scss";
import { useAuth } from "../../Context/AuthContext";

export default function CourtierClients() {
  const { getMyClients } = useAuth();
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await getMyClients();
      if (res.clients) setClients(res.clients);
    };
    fetchClients();
  }, []);

  return (
    <div className="clients-page">
      <h1>My Clients</h1>
      <ul>
        {clients.map((c) => (
          <li key={c._id}>
            <div className="client-info">
              <img src={c.picture || "/placeholder.jpg"} alt={c.name} />
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
