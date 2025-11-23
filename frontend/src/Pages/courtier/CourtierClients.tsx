import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/page.styles/Clients.scss";

const CourtierClients = () => {
  const { getCourtierProperties } = useAuth();
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    getCourtierProperties().then(data => {
      const uniqueClients = Array.from(new Set(data.properties.map((p: any) => p.clientId)));
      setClients(uniqueClients);
    });
  }, []);

  return (
    <div className="clients-page">
      <h1>My Clients</h1>
      <ul>
        {clients.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
};

export default CourtierClients;
