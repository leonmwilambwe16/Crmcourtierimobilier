import React, { useState, useEffect } from "react";
import { FaFileAlt, FaEye, FaDownload, FaTimes } from "react-icons/fa";
import "../../styles/page.styles/CourtierFiles.scss";
import { useAuth } from "../../Context/AuthContext";

export default function CourtierFiles() {
  const { getMyClients, getClientFiles, updateFileStatus } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await getMyClients();
      setClients(res.clients || []);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (!selectedClient) return;
    const fetchFiles = async () => {
      const res = await getClientFiles(selectedClient._id);
      setFiles(res.files || []);
    };
    fetchFiles();
  }, [selectedClient]);

  const handleStatusChange = async (fileId: string, newStatus: string) => {
    await updateFileStatus(selectedClient._id, fileId, newStatus);
    setFiles((prev) =>
      prev.map((f) => (f._id === fileId ? { ...f, status: newStatus } : f))
    );
  };

  const steps = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  return (
    <div className="client-files-page">
      <h2 className="title">Client Files</h2>

      {/* CLIENT SELECTION */}
      <select
        value={selectedClient?._id || ""}
        onChange={(e) => {
          const client = clients.find((c) => c._id === e.target.value);
          setSelectedClient(client);
        }}
      >
        <option value="">Select a client</option>
        {clients.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* FILES GRID */}
      {selectedClient && (
        <div className="files-grid">
          {files.map((file) => (
            <div key={file._id} className={`file-card ${file.status.toLowerCase()}`}>
              <div className="file-info">
                <div className="file-icon"><FaFileAlt /></div>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <div className="file-status">
                    <select
                      value={file.status}
                      onChange={(e) => handleStatusChange(file._id, e.target.value)}
                    >
                      {steps.map((s) => (
                        <option key={s} value={s}>{s.replace("_"," ")}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {files.length === 0 && <p>No files yet for this client.</p>}
        </div>
      )}
    </div>
  );
}
