import React, { useEffect, useState } from "react";
import "../../styles/page.styles/Client.courtier.scss";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ClientCourtiers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courtiers, setCourtiers] = useState<any[]>([]);
  const [selectedCourtier, setSelectedCourtier] = useState<any>(null);

  // Fetch courtiers from backend
  useEffect(() => {
    fetch("http://localhost:6080/api/auth/courtiers", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCourtiers(data.courtiers || []));
  }, []);

  const handleAddCourtier = (courtier: any) => {
    setSelectedCourtier(courtier);
  };

  const confirmChat = async () => {
    if (!selectedCourtier) return;
    // Assign courtier to client on backend
    await fetch(`http://localhost:6080/api/client/add-courtier/${selectedCourtier._id}`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/client-messages", { state: { courtier: selectedCourtier } });
  };

  return (
    <div className="client-courtier">
      <div className="title-row"><h2>Meet All Our Courtiers</h2></div>
      <div className="courtier-box">
        {courtiers.map((courtier) => (
          <div key={courtier._id} className="courtier-card">
            <img src={courtier.picture || "/default.png"} alt={courtier.firstName} />
            <button className="message-btn"><FiMessageSquare /></button>
            <button className="add-btn" onClick={() => handleAddCourtier(courtier)}><FiPlus /></button>
            <h3>{courtier.firstName} {courtier.lastName}</h3>
            <p>{courtier.email}</p>
          </div>
        ))}
      </div>

      {selectedCourtier && (
        <div className="popup-overlay">
          <div className="popup-card">
            <img src={selectedCourtier.picture || "/default.png"} alt={selectedCourtier.firstName} />
            <h2>{selectedCourtier.firstName} {selectedCourtier.lastName}</h2>
            <p>Do you want to start a chat with this courtier?</p>
            <div className="popup-buttons">
              <button className="yes-btn" onClick={confirmChat}>Yes</button>
              <button className="no-btn" onClick={() => setSelectedCourtier(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCourtiers;
