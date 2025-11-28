import { useState } from "react";
import "../../styles/page.styles/CourtierProperties.form.scss";

interface PropertyForm {
  title: string;
  price: string;
  address: string;
  city: string;
  description: string;
  image?: string;
}

export default function CourtierProperties() {
  const [properties, setProperties] = useState<PropertyForm[]>([]);
  const [success, setSuccess] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<PropertyForm>({
    title: "",
    price: "",
    address: "",
    city: "",
    description: "",
    image: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setForm({ ...form, image: url });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add or Edit property
  const submit = (e: any) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Edit
      const newProps = [...properties];
      newProps[editingIndex] = form;
      setProperties(newProps);
      setEditingIndex(null);
    } else {
      // Add
      setProperties([...properties, form]);
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
    setForm({ title: "", price: "", address: "", city: "", description: "", image: "" });
  };

  // Delete property
  const remove = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  // Edit property
  const edit = (index: number) => {
    setForm(properties[index]);
    setEditingIndex(index);
  };

  return (
    <div className="properties-container">
      {success && <div className="alert-box">{editingIndex !== null ? "Property Edited ✔" : "Property Added ✔"}</div>}

      {/* FORM LEFT */}
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

      {/* PROPERTIES RIGHT */}
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
