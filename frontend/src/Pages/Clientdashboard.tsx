import React from "react";
import "../styles/page.styles/Client.dashboard.scss";
import { useNavigate } from "react-router-dom";
import type { FileItem } from "../Pages/client/ClientFiles";
import { CourtierData } from "../Pages/Data/dataCourtier";
import { GiHouse } from "react-icons/gi";

// Status icons
import { MdPendingActions } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

// Section icons
import { FaFolderOpen, FaEnvelope, FaUserTie } from "react-icons/fa";

// Demo files
const demoFiles: FileItem[] = [
  { name: "House_rental_file.pdf", status: "IN_PROGRESS" },
  { name: "Identity_proof.png", status: "PENDING" },
  { name: "Contract_file.pdf", status: "COMPLETED" },
  { name: "Bank_statement.pdf", status: "CANCELLED" },
  { name: "Insurance.pdf", status: "PENDING" },
  { name: "Lease.pdf", status: "COMPLETED" },
];

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const statusCounts = demoFiles.reduce(
    (acc: Record<string, number>, file) => {
      acc[file.status] = (acc[file.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const statusOrder: FileItem["status"][] = [
    "IN_PROGRESS",
    "PENDING",
    "COMPLETED",
    "CANCELLED",
  ];

  const statusIcons: Record<FileItem["status"], React.ReactNode> = {
    IN_PROGRESS: <FaHourglassHalf />,
    PENDING: <MdPendingActions />,
    COMPLETED: <FaCheckCircle />,
    CANCELLED: <FaTimesCircle />,
  };

  const latestFiles = demoFiles.slice(0, 3);

  return (
    <div className="client-dashboard-content">
      {/* LEFT SIDE */}
      <div className="content-client-side-1">
        {/* Status Overview */}
        <div className="status-overview">
          {statusOrder.map((status) => (
            <div
              key={status}
              className={`status-card ${status.toLowerCase()}`}
              onClick={() => navigate("/client-files")}
            >
              <span className="status-title">
                {statusIcons[status]} {status.replace("_", " ")}
              </span>
              <span className="status-count">{statusCounts[status] || 0}</span>
            </div>
          ))}
        </div>

        {/* Latest Files */}
        <section
          className="dashboard-section overview-section latest-files-section"
          onClick={() => navigate("/client-files")}
        >
          <h3>
            <FaFolderOpen /> Latest Files
          </h3>

          <div className="files-grid">
            {latestFiles.map((file, i) => (
              <div key={i} className={`file-card ${file.status.toLowerCase()}`}>
                <div className="file-icon">
                  <FaFolderOpen />
                </div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-status">
                    {statusIcons[file.status]} {file.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <span className="view-more">View All Files →</span>
        </section>

        {/* Messages */}
        <section
          className="dashboard-section overview-section"
          onClick={() => navigate("/client-messages")}
        >
          <h3>
            <FaEnvelope /> Messages
          </h3>

          <p>You have 5 new messages</p>
          <span className="view-more">Go to Messages →</span>
        </section>

        {/* Properties */}
        <section
          className="dashboard-section overview-section"
          onClick={() => navigate("/client-properties")}
        >
          <h3>
            <GiHouse /> My Properties
          </h3>
          <p>You have 3 properties listed</p>
          <span className="view-more">View Properties →</span>
        </section>
      </div>

      {/* RIGHT SIDE */}
      <div className="content-client-side2">
        <h3>
          <FaUserTie /> Courtiers Available
        </h3>

        <div className="courtiers-overview">
          {CourtierData.map((courtier, index) => (
            <div className="courtier-card" key={index}>
              <div className="courtier-icon">
                <img src={courtier.picture} alt={courtier.name} />
              </div>
              <span className="courtier-name">{courtier.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
