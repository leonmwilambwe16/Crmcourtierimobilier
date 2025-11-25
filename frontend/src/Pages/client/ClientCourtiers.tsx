import React from 'react'
import "../../styles/page.styles/Client.courtier.scss"
import { CourtierData } from "../Data/dataCourtier"
import { FiPlus, FiMessageSquare } from "react-icons/fi"

const ClientCourtiers = () => {
  return (
    <div className='client-courtier'>

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
             
        <button className="add-btn">
          <FiPlus />
        </button>
            <h3>{courtier.name}</h3>
            <p>{courtier.description}</p>
          </div>
        ))}
      </div>
       
    </div>
  )
}

export default ClientCourtiers
