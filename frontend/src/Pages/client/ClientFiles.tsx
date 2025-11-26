import React, { useState } from "react";
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

  return (
    <div className="client-files-page">
      <h2 className="title">📁 Your Files</h2>
      <p className="subtitle">Check the status of your files</p>

      <div className="files-grid">
        {files.map((file, i) => (
          <div key={i} className="file-card">
            <div className="file-info">
              <span className="file-icon">📄</span>
              <p className="file-name">{file.name}</p>
            </div>

            {/* Status Timeline */}
            <div className="status-line">
              {steps.map((step, idx) => (
                <div key={idx} className="step">
                  <div
                    className={`circle ${
                      steps.indexOf(file.status) >= idx ? "active" : ""
                    }`}
                  ></div>
                  {idx !== steps.length - 1 && <div className="line"></div>}
                  <span className="step-label">{step.replace("_", " ")}</span>
                </div>
              ))}
            </div>

            <button className="view-btn" onClick={() => setSelected(file)}>
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <p className="modal-text">
              What do you want to do with this file?
            </p>
            <div className="modal-actions">
              <button className="read-btn">Read File</button>
              <button className="download-btn">Download File</button>
            </div>
            <button className="close-btn" onClick={() => setSelected(null)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFiles;
