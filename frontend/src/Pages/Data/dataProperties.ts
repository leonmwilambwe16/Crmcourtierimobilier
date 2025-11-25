import house1 from "../../assets/house1.jpg"
import house2 from "../../assets/house2.jpg"

export interface Properties {
  title: string;
  price: number;
  address: string;
  description: string;
  image: string;
}

export const PropertiesData = () => {
  return [
    {
      title: "Modern Apartment Downtown",
      price: 220000,
      address: "123 Main Street, Montreal, QC",
      description: "A beautiful modern 2-bedroom apartment located in the heart of downtown.",
      image: house1
    },
    {
      title: "Cozy Family Home",
      price: 350000,
      address: "45 Maple Avenue, Quebec City, QC",
      description: "A cozy 3-bedroom house perfect for families, with a big backyard.",
      image: house2
    },
  ];
};
