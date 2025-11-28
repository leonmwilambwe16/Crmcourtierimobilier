import React, { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/page.styles/CourtierFiles.scss";

export interface FileItem {
  name: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

const CourtierFiles: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { name: "House_rental_file.pdf", status: "IN_PROGRESS" },
    { name: "Identity_proof.png", status: "PENDING" },
  ]);

  const [selected, setSelected] = useState<FileItem | null>(null);
  const [form, setForm] = useState<FileItem>({ name: "", status: "PENDING" });

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

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return alert("Enter file name");
    setFiles(prev => [...prev, form]);
    setForm({ name: "", status: "PENDING" });
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index: number) => {
    const file = files[index];
    const newName = prompt("Edit file name:", file.name);
    if (newName) {
      const updated = [...files];
      updated[index] = { ...file, name: newName };
      setFiles(updated);
    }
  };

  return (
    <div className="client-files-page">
      <h2 className="title">Client Files</h2>
      <p className="subtitle">Create and track client documents</p>

      <form className="add-file-form" onSubmit={handleAddFile}>
        <input
          type="text"
          placeholder="File name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as FileItem["status"] })
          }
        >
          {steps.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <button type="submit">Add File</button>
      </form>

      <div className="files-grid">
        {files.map((file, i) => (
          <div key={i} className={`file-card ${file.status.toLowerCase()}`}>
            <div className="file-info">
              <div className="file-icon"><FaFileAlt /></div>
              <div className="file-details">
                <p className="file-name">{file.name}</p>
                <div className="file-status" style={{ color: getStatusColor(file.status) }}>
                  {file.status.replace("_", " ")}
                </div>
              </div>
            </div>

            <div className="status-line">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`step ${
                    steps.indexOf(file.status) > idx ? "completed" :
                    steps.indexOf(file.status) === idx ? "active" : ""
                  }`}
                >
                  <div className="circle"></div>
                  {idx !== steps.length - 1 && <div className="line"></div>}
                  <span className="step-label">{step.replace("_", " ")}</span>
                </div>
              ))}
            </div>

            <div className="card-buttons">
              <button className="view-btn" onClick={() => setSelected(file)}>
                <FaEye /> View
              </button>
              <button className="edit-btn" onClick={() => handleEdit(i)}>
                <FaEdit /> Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(i)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{selected.name}</h3>
            <p className="modal-text">What do you want to do with this file?</p>
            <div className="modal-actions">
              <button className="btn read-btn"><FaEye /> Read File</button>
              <button className="btn download-btn"><FaDownload /> Download File</button>
            </div>
            <button className="close-btn" onClick={() => setSelected(null)}>
              <FaTimes /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtierFiles;
