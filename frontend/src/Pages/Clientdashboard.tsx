import React, { useEffect, useState } from "react";
import "../styles/page.styles/Client.dashboard.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { GiHouse } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaFolderOpen, FaEnvelope, FaUserTie } from "react-icons/fa";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { getMyProperties, getMyDossier } = useAuth();

  const [properties, setProperties] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  const statusIcons = {
    IN_PROGRESS: <FaHourglassHalf />,
    PENDING: <MdPendingActions />,
    COMPLETED: <FaCheckCircle />,
    CANCELLED: <FaTimesCircle />,
  };

  useEffect(() => {
    getMyProperties().then((res) => {
      if (res.properties) setProperties(res.properties);
    });
    getMyDossier().then((res) => {
      if (res.dossiers) setFiles(res.dossiers);
    });
  }, []);

  const statusCounts = files.reduce((acc: Record<string, number>, file) => {
    acc[file.status] = (acc[file.status] || 0) + 1;
    return acc;
  }, {});

  const statusOrder = ["IN_PROGRESS", "PENDING", "COMPLETED", "CANCELLED"];
  const latestFiles = files.slice(0, 3);

  return (
    <div className="client-dashboard-content">
      <div className="content-client-side-1">
        <div className="status-overview">
          {statusOrder.map((status) => (
            <div key={status} className={`status-card ${status.toLowerCase()}`} onClick={() => navigate("/client-files")}>
              <span className="status-title">{statusIcons[status]} {status.replace("_", " ")}</span>
              <span className="status-count">{statusCounts[status] || 0}</span>
            </div>
          ))}
        </div>

        <section className="dashboard-section overview-section latest-files-section" onClick={() => navigate("/client-files")}>
          <h3><FaFolderOpen /> Latest Files</h3>
          <div className="files-grid">
            {latestFiles.map((file, i) => (
              <div key={i} className={`file-card ${file.status.toLowerCase()}`}>
                <div className="file-icon"><FaFolderOpen /></div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-status">{statusIcons[file.status]} {file.status.replace("_", " ")}</span>
                </div>
              </div>
            ))}
          </div>
          <span className="view-more">View All Files →</span>
        </section>

        <section className="dashboard-section overview-section" onClick={() => navigate("/client-messages")}>
          <h3><FaEnvelope /> Messages</h3>
          <p>You have {files.length} files pending</p>
          <span className="view-more">Go to Messages →</span>
        </section>

        <section className="dashboard-section overview-section" onClick={() => navigate("/client-properties")}>
          <h3><GiHouse /> My Properties</h3>
          <p>You have {properties.length} properties listed</p>
          <span className="view-more">View Properties →</span>
        </section>
      </div>

      <div className="content-client-side2">
        <h3><FaUserTie /> Courtiers Available</h3>
        <div className="courtiers-overview">
          {/* Courtiers should be fetched from backend later */}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
