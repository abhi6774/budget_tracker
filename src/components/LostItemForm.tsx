import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/lostitemform.css';

interface ItemDetails {
  name: string;
  place: string;
  details: string;
  image: File | null;
}

interface LostItemFormProps {
  onSubmit: (itemDetails: ItemDetails) => void;
}

const LostItemForm: React.FC<LostItemFormProps> = ({ onSubmit }) => {
  const [itemDetails, setItemDetails] = useState<ItemDetails>({
    name: '',
    place: '',
    details: '',
    image: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setItemDetails(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted item details:', itemDetails);
  };
    

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="title">Lost Item Details</h2>
      <div className="formGroup">
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={itemDetails.name}
          onChange={handleInputChange}
          required
          className="input"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="place">Lost location:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={itemDetails.place}
          onChange={handleInputChange}
          required
          className="input"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="details">Item Details:</label>
        <textarea
          id="details"
          name="details"
          value={itemDetails.details}
          onChange={handleInputChange}
          className="textarea"
          rows={4}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="image">Item Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="fileInput"
        />
      </div>
      <button type="submit" className="submitButton">Submit</button>
    </form>
  );
};

export default LostItemForm;