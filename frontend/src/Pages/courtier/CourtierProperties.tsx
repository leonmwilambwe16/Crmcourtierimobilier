import React, { useState, useEffect } from "react";
import "../../styles/page.styles/CourtierProperties.form.scss";
import { useAuth } from "../../Context/AuthContext";

interface PropertyForm {
  _id?: string;
  title: string;
  price: number;
  address: string;
  city: string;
  description: string;
  image?: string;
}

export default function CourtierProperties() {
  const { getCourtierProperties, createProperty } = useAuth();
  const [properties, setProperties] = useState<PropertyForm[]>([]);
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    price: 0,
    address: "",
    city: "",
    description: "",
    image: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await getCourtierProperties();
      setProperties(res.properties || []);
    };
    fetchProperties();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setForm({ ...form, image: url });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Edit locally
      const newProps = [...properties];
      newProps[editingIndex] = form;
      setProperties(newProps);
      setEditingIndex(null);
    } else {
      // Add new property via backend
      const res = await createProperty(form);
      if (res.success) {
        setProperties([...properties, res.property]);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      }
    }
    setForm({ title: "", price: 0, address: "", city: "", description: "", image: "" });
  };

  const remove = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const edit = (index: number) => {
    setForm(properties[index]);
    setEditingIndex(index);
  };

  return (
    <div className="properties-container">
      {success && <div className="alert-box">{editingIndex !== null ? "Property Edited ✔" : "Property Added ✔"}</div>}

      {/* FORM */}
      <form className="add-form-card" onSubmit={submit}>
        <h2>{editingIndex !== null ? "Edit Property" : "Add Property"}</h2>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button className="add-btn" type="submit">{editingIndex !== null ? "Save Changes" : "Add Property"}</button>
      </form>

      {/* PROPERTIES LIST */}
      <div className="properties-grid">
        {properties.length === 0 && <p>No properties yet...</p>}

        {properties.map((p, idx) => (
          <div key={idx} className="property-card">
            {p.image && <img src={p.image} alt={p.title} />}
            <h3>{p.title}</h3>
            <p className="price">${Number(p.price).toLocaleString()}</p>
            <p>{p.address}, {p.city}</p>
            <p className="description">{p.description}</p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => edit(idx)}>Edit</button>
              <button className="delete-btn" onClick={() => remove(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
