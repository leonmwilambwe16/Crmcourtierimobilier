import React, { useEffect, useState } from "react";
import "../../styles/admin.styles/CourtierAdmin.scss";
import { useAuth } from "../../Context/AuthContext";

type Courtier = {
  id: string;
  name: string;
  email: string;
  agency: string;
  photo: string;
};

const ManageCourtiers: React.FC = () => {
  const { getMyDossier, updateRole } = useAuth(); // reuse getMyDossier for fetching users
  const [courtiers, setCourtiers] = useState<Courtier[]>([]);
  const [selected, setSelected] = useState<Courtier | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  // Fetch courtiers from backend
  useEffect(() => {
    const fetchCourtiers = async () => {
      const data = await getMyDossier(); // assuming this fetches all users/dossiers
      // filter only courtiers
      const courtierList: Courtier[] = (data.files || []).filter(
        (c: any) => c.role === "COURTIER"
      ).map((c: any) => ({
        id: c.id,
        name: c.clientName || c.name,
        email: c.clientEmail || c.email,
        agency: c.agency || "N/A",
        photo: c.photo || "https://via.placeholder.com/60",
      }));
      setCourtiers(courtierList);
    };
    fetchCourtiers();
  }, []);

  const openModal = (courtier: Courtier, type: "edit" | "delete") => {
    setSelected(courtier);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
  };

  // Update courtier info via backend
  const updateCourtier = async () => {
    if (selected) {
      // call updateRole as example (or create another backend endpoint for updating details)
      await updateRole(selected.id, "COURTIER");
      setCourtiers(
        courtiers.map((c) => (c.id === selected.id ? selected : c))
      );
    }
    closeModal();
  };

  // Delete courtier from backend (you need an endpoint for that)
  const deleteCourtier = async () => {
    if (selected) {
      // example: call backend delete
      // await deleteCourtierAPI(selected.id)
      setCourtiers(courtiers.filter((c) => c.id !== selected.id));
    }
    closeModal();
  };

  return (
    <div className="clients-page">
      <h1>Manage Courtiers</h1>

      <div className="client-table">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Agency</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courtiers.map((c) => (
              <tr key={c.id}>
                <td>
                  <img
                    src={c.photo}
                    alt={c.name}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </td>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.agency}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => openModal(c, "edit")}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => openModal(c, "delete")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType && selected && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {modalType === "edit" && (
              <>
                <h2>Edit Courtier</h2>
                <input
                  type="text"
                  value={selected.name}
                  onChange={(e) =>
                    setSelected({ ...selected, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={selected.email}
                  onChange={(e) =>
                    setSelected({ ...selected, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={selected.agency}
                  onChange={(e) =>
                    setSelected({ ...selected, agency: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={selected.photo}
                  onChange={(e) =>
                    setSelected({ ...selected, photo: e.target.value })
                  }
                  placeholder="Image URL"
                />
                <button className="confirm-btn" onClick={updateCourtier}>
                  Save
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h2>Delete Courtier</h2>
                <p>Are you sure you want to delete {selected.name}?</p>
                <button className="delete-btn confirm-delete" onClick={deleteCourtier}>
                  Yes, Delete
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourtiers;
