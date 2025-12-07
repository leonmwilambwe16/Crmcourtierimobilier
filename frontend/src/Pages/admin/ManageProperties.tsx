import React, { useState } from "react";
import "../../styles/admin.styles/AdminProprerties.scss";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
};

const initialProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Condo",
    location: "Toronto",
    price: 850000,
    image: "https://via.placeholder.com/100"
  },
  {
    id: 2,
    title: "Family House",
    location: "Montreal",
    price: 650000,
    image: "https://via.placeholder.com/100"
  },
  {
    id: 3,
    title: "Downtown Loft",
    location: "Vancouver",
    price: 950000,
    image: "https://via.placeholder.com/100"
  },
];

const ManageProperties: React.FC = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [selected, setSelected] = useState<Property | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const openModal = (p: Property, type: "edit" | "delete") => {
    setSelected(p);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
  };

  const deleteProperty = () => {
    if (selected) setProperties(properties.filter((p) => p.id !== selected.id));
    closeModal();
  };

  const updateProperty = () => {
    if (selected)
      setProperties(
        properties.map((p) => (p.id === selected.id ? selected : p))
      );
    closeModal();
  };

  return (
    <div className="properties-page">
      <h1>Manage Properties</h1>

      <div className="client-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: 90,
                      height: 60,
                      borderRadius: 8,
                      objectFit: "cover"
                    }}
                  />
                </td>

                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>{p.price.toLocaleString()}</td>

                <td className="actions">
                  <button className="edit-btn" onClick={() => openModal(p, "edit")}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => openModal(p, "delete")}>
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
                <h2>Edit Property</h2>

                <input
                  type="text"
                  value={selected.title}
                  onChange={(e) =>
                    setSelected({ ...selected, title: e.target.value })
                  }
                />

                <input
                  type="text"
                  value={selected.location}
                  onChange={(e) =>
                    setSelected({ ...selected, location: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={selected.price}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      price: Number(e.target.value)
                    })
                  }
                />

                <input
                  type="text"
                  value={selected.image}
                  onChange={(e) =>
                    setSelected({ ...selected, image: e.target.value })
                  }
                  placeholder="Image URL"
                />

                <button className="confirm-btn" onClick={updateProperty}>
                  Save
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h2>Delete Property</h2>
                <p>Are you sure you want to delete {selected.title}?</p>

                <button className="delete-btn confirm-delete" onClick={deleteProperty}>
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

export default ManageProperties;
