import React, { useEffect, useState } from "react";
import "../styles/page.styles/Courtier.dashboard.scss";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaEnvelope, FaUserTie, FaFileAlt, FaHome } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const CourtierDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { getMyClients, getMyFiles, getMyProperties } = useAuth();

  const [clients, setClients] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const c = await getMyClients();
      const f = await getMyFiles();
      const p = await getMyProperties();
      setClients(c.clients || []);
      setFiles(f.files || []);
      setProperties(p.properties || []);
    };
    fetchData();
  }, []);

  return (
    <div className="courtier-dashboard-content">
      <div className="dashboard-left">
        {/* Clients */}
        <section className="dashboard-section" onClick={() => navigate("/courtier-clients")}>
          <h3><FaUserTie /> My Clients</h3>
          <p>Total clients: {clients.length}</p>
          <div className="overview-thumbnails">
            {clients.map((c) => (
              <img key={c._id} src={c.picture || "/placeholder.jpg"} alt={c.name} title={c.name} />
            ))}
          </div>
        </section>

        {/* Files */}
        <section className="dashboard-section" onClick={() => navigate("/courtier-files")}>
          <h3><FaFileAlt /> Client Files</h3>
          <p>Total files: {files.length}</p>
          <ul>
            {files.slice(0, 3).map((f, i) => (
              <li key={i}>
                {f.name} - <span className={f.status.toLowerCase()}>{f.status.replace("_"," ")}</span>
              </li>
            ))}
          </ul>
          <span className="view-more">View All Files →</span>
        </section>

        {/* Properties */}
        <section className="dashboard-section" onClick={() => navigate("/courtier-properties")}>
          <h3><FaHome /> My Properties</h3>
          <p>Total properties: {properties.length}</p>
          <ul>
            {properties.slice(0, 3).map((p, i) => (
              <li key={i}>{p.title} - {p.city}</li>
            ))}
          </ul>
          <span className="view-more">View All Properties →</span>
        </section>

        {/* Messages */}
        <section className="dashboard-section" onClick={() => navigate("/courtier-messages")}>
          <h3><FaEnvelope /> Messages</h3>
          <p>You have 5 new messages</p>
          <span className="view-more">Go to Messages →</span>
        </section>
      </div>

      {/* RIGHT SIDE: Quick Stats */}
      <div className="dashboard-right">
        <h3>Quick Stats</h3>
        <div className="stats-card">
          <div>
            <strong>{clients.length}</strong>
            <p>Clients</p>
          </div>
          <div>
            <strong>{files.length}</strong>
            <p>Files</p>
          </div>
          <div>
            <strong>{properties.length}</strong>
            <p>Properties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtierDashboard;
