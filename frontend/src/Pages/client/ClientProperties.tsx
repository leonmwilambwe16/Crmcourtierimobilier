import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const ClientProperties = () => {
  const { getMyProperties } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    getMyProperties().then(data => setProperties(data.properties));
  }, []);

  return (
    <div className="properties-page">
      <h1>My Properties</h1>
      <ul>
        {properties.map(p => (
          <li key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.address}</p>
            <p>Price: {p.price}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientProperties;
