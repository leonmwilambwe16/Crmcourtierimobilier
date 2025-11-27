import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/page.styles/CourtierProperties.form.scss";

interface PropertyForm {
  title: string;
  price: string;
  address: string;
  city: string;
  description: string;
  image?: File | null;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  description: string;
  imageUrl?: string;
}

const CourtierProperties = () => {
  const { getCourtierProperties, createProperty, user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    price: "",
    address: "",
    city: "",
    description: "",
    image: null
  });

  const fetchProperties = async () => {
    try {
      const res = await getCourtierProperties();
      setProperties(res?.properties || []);
    } catch {
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setForm({ ...form, image: file });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in");

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("price", form.price);
    payload.append("address", form.address);
    payload.append("city", form.city);
    payload.append("description", form.description);
    if (form.image) payload.append("image", form.image);
    payload.append("courtierId", user.id);

    const res = await createProperty(payload);

    if (res?.success) {
      alert("Property Added!");
      setForm({ title: "", price: "", address: "", city: "", description: "", image: null });
      fetchProperties();
    }
  };

  return (
    <div className="properties-container">
      <h1>My Properties</h1>

      {/* Add Property Form Styled Like Card */}
      <form onSubmit={handleSubmit} className="property-card add-form-card">
        <input name="title" placeholder="Property Title" value={form.title} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />

        {/* 📌 Image Upload */}
        <label className="upload-box">
          Upload Property Picture 📷
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>

        <button type="submit" className="add-btn">Add Property</button>
      </form>

      {/* Display Properties In Grid */}
      {properties.map((p) => (
        <div key={p._id} className="property-card">
          <img src={p.imageUrl || "/placeholder.jpg"} className="property-image" alt="Property" />
          <h2 className="property-title">{p.title}</h2>
          <p className="property-price">${p.price.toLocaleString()}</p>
          <p className="property-address">{p.address}, {p.city}</p>
          <p className="property-description">{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourtierProperties;
