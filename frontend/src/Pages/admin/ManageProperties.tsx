// ManageProperties.tsx
import React, { useState, useEffect } from "react";
import "../../styles/admin.styles/AdminProprerties.scss";
import { useAuth } from "../../Context/AuthContext";

const ManageProperties: React.FC = () => {
  const { getCourtierProperties, createProperty } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getCourtierProperties();
      setProperties(data.properties || []);
    };
    fetchProperties();
  }, []);

  const openModal = (p: any, type: "edit" | "delete") => {
    setSelected(p);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
  };

  const updateProperty = async () => {
    if (selected) {
      await createProperty(selected); // or call your backend update endpoint
      setProperties(properties.map(p => p.id === selected.id ? selected : p));
    }
    closeModal();
  };

  const deleteProperty = async () => {
    if (selected) {
      // call backend delete endpoint
      setProperties(properties.filter(p => p.id !== selected.id));
    }
    closeModal();
  };

  return (
    <div className="properties-page">
      <h1>Manage Properties</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th><th>ID</th><th>Title</th><th>Location</th><th>Price</th><th>Courtier</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.title} style={{ width: 80, height: 50, objectFit: "cover" }}/></td>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.location}</td>
              <td>{p.price.toLocaleString()}</td>
              <td>{p.createdBy?.name}</td>
              <td>
                <button onClick={() => openModal(p, "edit")}>Edit</button>
                <button onClick={() => openModal(p, "delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalType && selected && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {modalType === "edit" && selected && (
              <>
                <h2>Edit Property</h2>
                <input type="text" value={selected.title} onChange={e => setSelected({...selected, title: e.target.value})}/>
                <input type="text" value={selected.location} onChange={e => setSelected({...selected, location: e.target.value})}/>
                <input type="number" value={selected.price} onChange={e => setSelected({...selected, price: Number(e.target.value)})}/>
                <input type="text" value={selected.image} onChange={e => setSelected({...selected, image: e.target.value})}/>
                <button onClick={updateProperty}>Save</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
            {modalType === "delete" && selected && (
              <>
                <h2>Delete Property</h2>
                <p>Are you sure to delete {selected.title}?</p>
                <button onClick={deleteProperty}>Yes, Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
