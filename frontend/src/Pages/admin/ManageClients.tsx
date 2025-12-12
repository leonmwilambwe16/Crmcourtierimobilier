// ManageClients.tsx
import React, { useEffect, useState } from "react";
import "../../styles/admin.styles/ClientAdmin.scss";
import { useAuth } from "../../Context/AuthContext";

const ManageClients: React.FC = () => {
  const { getMyDossier, updateDossier, updateRole } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | "role" | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getMyDossier(); // assuming this fetches clients/dossiers
      setClients(data.files || []);
    };
    fetchClients();
  }, []);

  const openModal = (client: any, type: "edit" | "delete" | "role") => {
    setSelectedClient(client);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModalType(null);
  };

  const saveClient = async () => {
    if (modalType === "role" && selectedClient) {
      await updateRole(selectedClient.id, selectedClient.role);
    } else if (modalType === "edit" && selectedClient) {
      await updateDossier(selectedClient.id, selectedClient);
    }
    setClients(clients.map(c => c.id === selectedClient.id ? selectedClient : c));
    closeModal();
  };

  const deleteClient = async () => {
    if (selectedClient) {
      // call backend delete endpoint
      setClients(clients.filter(c => c.id !== selectedClient.id));
    }
    closeModal();
  };

  return (
    <div className="clients-page">
      <h1>Manage Clients</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.clientName}</td>
              <td>{c.clientEmail}</td>
              <td>{c.role}</td>
              <td>
                <button onClick={() => openModal(c, "edit")}>Edit</button>
                <button onClick={() => openModal(c, "role")}>Change Role</button>
                <button onClick={() => openModal(c, "delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalType && selectedClient && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {modalType === "edit" && (
              <>
                <h2>Edit Client</h2>
                <input type="text" value={selectedClient.clientName} onChange={e => setSelectedClient({...selectedClient, clientName: e.target.value})}/>
                <input type="email" value={selectedClient.clientEmail} onChange={e => setSelectedClient({...selectedClient, clientEmail: e.target.value})}/>
                <button onClick={saveClient}>Save</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
            {modalType === "role" && (
              <>
                <h2>Change Role</h2>
                <select value={selectedClient.role} onChange={e => setSelectedClient({...selectedClient, role: e.target.value})}>
                  <option value="CLIENT">Client</option>
                  <option value="COURTIER">Courtier</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button onClick={saveClient}>Save</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
            {modalType === "delete" && (
              <>
                <h2>Delete Client</h2>
                <p>Are you sure to delete {selectedClient.clientName}?</p>
                <button onClick={deleteClient}>Yes, Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClients;
