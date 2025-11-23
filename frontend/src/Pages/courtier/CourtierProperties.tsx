import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/page.styles/Properties.scss";

interface PropertyForm {
  title: string;
  price: string;
  address: string;
  city: string;
  description: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  description: string;
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
  });

  // Fetch courtier properties
  const fetchProperties = async () => {
    try {
      const res = await getCourtierProperties();
      if (res?.properties) setProperties(res.properties);
      else setProperties([]);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new property
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("❌ You must be logged in as a courtier.");
      return;
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        courtierId: user.id,
      };

      const res = await createProperty(payload);

      if (res?.success) {
        alert("✅ Property added successfully!");
        setForm({ title: "", price: "", address: "", city: "", description: "" });
        fetchProperties(); // refresh list
      } else {
        alert("❌ Error creating property: " + (res?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error creating property:", error);
      alert("❌ Error creating property.");
    }
  };

  return (
    <div className="properties-page">
      <h1>My Properties</h1>

      {/* Add Property Form */}
      <form onSubmit={handleSubmit} className="add-property-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Property</button>
      </form>

      {/* List of Properties */}
      <ul className="property-list">
        {properties.length > 0 ? (
          properties.map((p) => (
            <li key={p._id}>
              <strong>{p.title}</strong> — {p.address}, {p.city} | ${p.price}
              <p>{p.description}</p>
            </li>
          ))
        ) : (
          <li>No properties yet.</li>
        )}
      </ul>
    </div>
  );
};

export default CourtierProperties;
