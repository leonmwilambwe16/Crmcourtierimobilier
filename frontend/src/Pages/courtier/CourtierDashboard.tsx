import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/page.styles/Dashboard.scss";

const CourtierDashboard = () => {
  const { getCourtierProperties } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    getCourtierProperties().then(data => setProperties(data.properties));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Courtier Dashboard</h1>
      <p>You can see your properties and client dossiers here.</p>
      <ul>
        {properties.map(p => (
          <li key={p._id}>{p.title} - {p.clientId}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourtierDashboard;
