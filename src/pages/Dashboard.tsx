import { useEffect, useState } from "react";
import "../styles/dashboard.css"
import { IoIosAddCircle } from "react-icons/io";
import LostItemForm from "../components/LostItemForm";
import Card from "../components/Card";


interface ItemDetails {
  name: string;
  place: string;
  details: string;
  image: File | null;
}

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = (itemDetails: ItemDetails) => {
    console.log('Submitted item details:', itemDetails);
    // Here you can process the submitted data
    // For example, send it to a server or update your application state
    
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="container">  
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <LostItemForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}

      <div className="nav">
        <p>Lost&Found</p>
        <IoIosAddCircle onClick={() => setShowPopup(!showPopup)} style={{ fontSize: "2rem" }} />
      </div>   

      <div className="cards">
        <div className='cardContainer'>
            <img src="https://img.freepik.com/free-photo/fresh-ripe-apple-white-background-close-up-generative-ai_188544-8731.jpg" alt="this is an image" />
            <h1>{'item name'}</h1>
            <p>{"detail"}</p>
            <p>{"location"}</p>
            <button>Found it!</button>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard;