import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";


const ClientFiles = () => {
  const { getMyDossier } = useAuth();
  const [dossier, setDossier] = useState<any>(null);

  useEffect(() => {
    getMyDossier().then(res => setDossier(res.dossier));
  }, []);

  return (
    <div className="files-page">
      <h1>My Files</h1>
      {dossier ? (
        <div>
          <p>Client ID: {dossier.clientId}</p>
          <p>Courtier ID: {dossier.courtierId}</p>
          <p>Status: {dossier.status || "Pending"}</p>
        </div>
      ) : (
        <p>Loading files...</p>
      )}
    </div>
  );
};

export default ClientFiles;
