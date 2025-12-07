import React, { useState } from "react";
import "../../styles/admin.styles/CourtierAdmin.scss";

type Courtier = {
  id: number;
  name: string;
  email: string;
  agency: string;
  photo: string;
};

const initialCourtiers: Courtier[] = [
  {
    id: 1,
    name: "Adam Royal",
    email: "adam@agency.com",
    agency: "Royal Agency",
    photo: "https://via.placeholder.com/60"
  },
  {
    id: 2,
    name: "Linda Broker",
    email: "linda@bestbroker.com",
    agency: "Best Broker",
    photo: "https://via.placeholder.com/60"
  },
  {
    id: 3,
    name: "Marc Hudson",
    email: "marc@homes.com",
    agency: "Homes & Co",
    photo: "https://via.placeholder.com/60"
  },
];

const ManageCourtiers: React.FC = () => {
  const [courtiers, setCourtiers] = useState(initialCourtiers);
  const [selected, setSelected] = useState<Courtier | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const openModal = (courtier: Courtier, type: "edit" | "delete") => {
    setSelected(courtier);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
  };

  const deleteCourtier = () => {
    if (selected) setCourtiers(courtiers.filter((c) => c.id !== selected.id));
    closeModal();
  };

  const updateCourtier = () => {
    if (selected)
      setCourtiers(
        courtiers.map((c) => (c.id === selected.id ? selected : c))
      );
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
