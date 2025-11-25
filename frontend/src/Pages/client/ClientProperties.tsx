import React from 'react';
import { PropertiesData } from "../Data/dataProperties";
import "../../styles/page.styles/Properties.scss";

const ClientProperties = () => {
  const properties = PropertiesData();

  return (
    <div className="properties-container">
       <h1>My Properties</h1>
      {properties.map((item, index) => (
        <div key={index} className="property-card">
          <img src={item.image} alt={item.title} className="property-image" />

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
