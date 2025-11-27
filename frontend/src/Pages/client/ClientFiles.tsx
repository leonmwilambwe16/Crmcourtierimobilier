import React, { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaTimes } from "react-icons/fa";
import "../../styles/page.styles/ClientFiles.scss";

export interface FileItem {
  name: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

const ClientFiles: React.FC = () => {
  const [selected, setSelected] = useState<FileItem | null>(null);

  const files: FileItem[] = [
    { name: "House_rental_file.pdf", status: "IN_PROGRESS" },
    { name: "Identity_proof.png", status: "PENDING" },
    { name: "Contract_file.pdf", status: "COMPLETED" },
    { name: "Bank_statement.pdf", status: "CANCELLED" },
  ];

  const steps = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "#ff9800";
      case "IN_PROGRESS": return "#2196f3";
      case "COMPLETED": return "#4caf50";
      case "CANCELLED": return "#f44336";
      default: return "#ccc";
    }
  };

  return (
    <div className="client-files-page">
      <h2 className="title">Your Files</h2>
      <p className="subtitle">Check the status of your files</p>

      <div className="files-grid">
        {files.map((file, i) => (
          <div key={i} className={`file-card ${file.status.toLowerCase()}`}>
            <div className="file-info">
              <div className="file-icon">
                <FaFileAlt />
              </div>
              <div className="file-details">
                <p className="file-name">{file.name}</p>
                <div className="file-status">
                  <span style={{ color: getStatusColor(file.status) }}>
                    {file.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="status-line">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`step ${
                    steps.indexOf(file.status) > idx
                      ? "completed"
                      : steps.indexOf(file.status) === idx
                        ? "active"
                        : ""
                  }`}
                >
                  <div className="circle"></div>
                  {idx !== steps.length - 1 && <div className="line"></div>}
                  <span className="step-label">
                    {step.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>

            <button className="view-btn" onClick={() => setSelected(file)}>
              <FaEye className="btn-icon" /> View
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{selected.name}</h3>
            <p className="modal-text">
              What do you want to do with this file?
            </p>
            <div className="modal-actions">
              <button className="btn read-btn">
                <FaEye className="btn-icon" /> Read File
              </button>
              <button className="btn download-btn">
                <FaDownload className="btn-icon" /> Download File
              </button>
            </div>
            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              <FaTimes className="btn-icon" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFiles;
