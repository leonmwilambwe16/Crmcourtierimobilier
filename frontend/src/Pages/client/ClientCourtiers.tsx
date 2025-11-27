import React, { useState } from "react";
import "../../styles/page.styles/Client.courtier.scss";
import { CourtierData } from "../Data/dataCourtier";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ClientCourtiers = () => {
  const [selectedCourtier, setSelectedCourtier] = useState<any>(null);
  const navigate = useNavigate();

  const handleAddCourtier = (courtier: any) => {
    console.log("Courtier clicked:", courtier); // DEBUG
    setSelectedCourtier(courtier);
  };

  const confirmChat = () => {
    navigate("/client-messages", { state: { courtier: selectedCourtier } });
  };

  return (
    <div className="client-courtier">

      <div className="title-row">
        <h2>Meet All Our Courtiers</h2>
      </div>

      <div className="courtier-box">
        {CourtierData.map((courtier, index) => (
          <div className="courtier-card" key={index}>
            <img src={courtier.picture} alt={courtier.name} />

            <button className="message-btn">
              <FiMessageSquare />
            </button>

            <button
              className="add-btn"
              onClick={() => handleAddCourtier(courtier)}
            >
              <FiPlus />
            </button>

            <h3>{courtier.name}</h3>
            <p>{courtier.description}</p>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedCourtier && (
        <div className="popup-overlay">
          <div className="popup-card">
            <img
              src={selectedCourtier.picture}
              alt={selectedCourtier.name}
            />

            <h2>{selectedCourtier.name}</h2>
            <p>Do you want to start a chat with this courtier?</p>

            <div className="popup-buttons">
              <button className="yes-btn" onClick={confirmChat}>
                Yes
              </button>
              <button
                className="no-btn"
                onClick={() => setSelectedCourtier(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientCourtiers;
