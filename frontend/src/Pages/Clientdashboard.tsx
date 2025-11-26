import React from "react";
import "../styles/page.styles/Client.dashboard.scss";
import { useNavigate } from "react-router-dom";
import type { FileItem } from "../Pages/client/ClientFiles";
import { CourtierData } from "../Pages/Data/dataCourtier";

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

  // Count files by status
  const statusCounts = demoFiles.reduce(
    (acc: Record<string, number>, file) => {
      acc[file.status] = (acc[file.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const statusOrder: FileItem["status"][] = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ];

  const latestFiles = demoFiles.slice(0, 3);

  return (
    <div className="client-dashboard-content">
      {/* Left main content */}
      <div className="content-client-side-1">
        {/* Status overview */}
        <div className="status-overview">
          {statusOrder.map((status) => (
            <div
              key={status}
              className={`status-card ${status.toLowerCase()}`}
              onClick={() => navigate("/files")}
            >
              <span className="status-title">{status.replace("_", " ")}</span>
              <span className="status-count">{statusCounts[status] || 0}</span>
            </div>
          ))}
        </div>

        {/* Files Overview */}
        <section
          className="dashboard-section overview-section"
          onClick={() => navigate("/files")}
        >
          <h3>📁 Latest Files</h3>
          <ul>
            {latestFiles.map((file, i) => (
              <li key={i}>
                {file.name} - {file.status.replace("_", " ")}
              </li>
            ))}
          </ul>
          <span className="view-more">View All Files →</span>
        </section>

        {/* Messages Overview */}
        <section
          className="dashboard-section overview-section"
          onClick={() => navigate("/messages")}
        >
          <h3>💬 Messages</h3>
          <p>You have 5 new messages</p>
          <span className="view-more">Go to Messages →</span>
        </section>

        {/* Properties Overview */}
        <section
          className="dashboard-section overview-section"
          onClick={() => navigate("/properties")}
        >
          <h3>🏠 My Properties</h3>
          <p>You have 3 properties listed</p>
          <span className="view-more">View Properties →</span>
        </section>
      </div>

      {/* Right sidebar: Courtiers Available */}
      <div className="content-client-side2">
        <h3>👥 Courtiers Available</h3>
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
