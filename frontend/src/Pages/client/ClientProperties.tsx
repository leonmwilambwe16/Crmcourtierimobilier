import React, { useEffect, useState } from "react";
import "../../styles/page.styles/Properties.scss";
import { useAuth } from "../../Context/AuthContext";

const ClientProperties: React.FC = () => {
  const { getMyProperties } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await getMyProperties();
      if (res.properties) setProperties(res.properties);
    };
    fetchProperties();
  }, []);

  return (
    <div className="properties-container">
      <h1>My Properties</h1>
      {properties.length === 0 && <p>No properties found.</p>}
      {properties.map((item) => (
        <div key={item._id} className="property-card">
          <img src={item.image || "/default.png"} alt={item.title} className="property-image" />
          <h2 className="property-title">{item.title}</h2>
          <p className="property-price">${item.price.toLocaleString()}</p>
          <p className="property-address">{item.address}</p>
          <p className="property-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientProperties;
