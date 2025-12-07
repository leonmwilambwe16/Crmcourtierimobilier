import React, { useState } from "react";
import '../../styles/admin.styles/ClientAdmin.scss';

type Client = {
  id: number;
  name: string;
  email: string;
  role: "client" | "courtier" | "admin";
  picture?: string;
};

const initialClients: Client[] = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "client", picture: "/images/users/user1.png" },
  { id: 2, name: "Sarah Smith", email: "sarah@mail.com", role: "courtier", picture: "/images/users/user2.png" },
  { id: 3, name: "Alice Cooper", email: "alice@mail.com", role: "client", picture: "/images/users/user3.png" },
  { id: 4, name: "Michael Brown", email: "michael@mail.com", role: "admin", picture: "/images/users/user4.png" },
];

const ManageClients: React.FC = () => {
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | "role" | null>(null);

  const openModal = (client: Client, type: "edit" | "delete" | "role") => {
    setSelectedClient(client);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModalType(null);
  };

  const deleteClient = () => {
    if (selectedClient) setClients(clients.filter((c) => c.id !== selectedClient.id));
    closeModal();
  };

  const updateClient = () => {
    if (selectedClient)
      setClients(clients.map((c) => (c.id === selectedClient.id ? selectedClient : c)));
    closeModal();
  };

  return (
    <div className="clients-page">
      <h1>Manage Clients</h1>

      <div className="client-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>

                {/* PROFILE PICTURE */}
                <td>
                  <img
                    src={client.picture || "/images/default-avatar.png"}
                    alt={client.name}
                    className="client-picture"
                  />
                </td>

                <td>{client.name}</td>
                <td>{client.email}</td>

                <td className={`role ${client.role}`}>
                  {client.role}
                </td>

                <td className="actions">
                  <button onClick={() => openModal(client, "edit")} className="edit-btn">Edit</button>
                  <button onClick={() => openModal(client, "role")} className="role-btn">Change Role</button>
                  <button onClick={() => openModal(client, "delete")} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* MODAL */}
      {modalType && selectedClient && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {/* EDIT CLIENT */}
            {modalType === "edit" && (
              <>
                <h2>Edit Client</h2>
                <input
                  type="text"
                  value={selectedClient.name}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={selectedClient.email}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, email: e.target.value })
                  }
                />
                <button className="confirm-btn" onClick={updateClient}>Save</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </>
            )}

            {/* CHANGE ROLE */}
            {modalType === "role" && (
              <>
                <h2>Change Role</h2>
                <select
                  value={selectedClient.role}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, role: e.target.value as Client["role"] })
                  }
                >
                  <option value="client">Client</option>
                  <option value="courtier">Courtier</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="confirm-btn" onClick={updateClient}>Save</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </>
            )}

            {/* DELETE */}
            {modalType === "delete" && (
              <>
                <h2>Delete Client</h2>
                <p>Are you sure you want to delete {selectedClient.name}?</p>
                <button className="delete-btn confirm-delete" onClick={deleteClient}>Yes, Delete</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClients;
