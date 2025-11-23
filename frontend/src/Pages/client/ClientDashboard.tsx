import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const ClientDashboard = () => {
  const { getMyDossier } = useAuth();
  const [dossier, setDossier] = useState<any>(null);

  useEffect(() => {
    getMyDossier().then(data => setDossier(data.dossier));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Client Dashboard</h1>
      {dossier ? (
        <div className="dossier-info">
          <h3>Dossier Status</h3>
          <p>ClientId: {dossier.clientId}</p>
          <p>CourtierId: {dossier.courtierId}</p>
        </div>
      ) : (
        <p>Loading dossier...</p>
      )}
    </div>
  );
};

export default ClientDashboard;
