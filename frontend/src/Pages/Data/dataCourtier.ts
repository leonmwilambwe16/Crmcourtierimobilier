import picture1 from "../../assets/picture1.png";
import picture2 from "../../assets/picture2.png";

export interface Courtier {
  id: number;
  name: string;
  picture: string;
  description: string;
}

export const CourtierData: Courtier[] = [
  {
    id: 1,
    name: "Jean Philip",
    picture: picture1,
    description: "Experienced courtier specializing in client relations."
  },
  {
    id: 2,
    name: "Nancy",
    picture: picture2,
    description: "Expert in financial advice and client support."
  },
];
