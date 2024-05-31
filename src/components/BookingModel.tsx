import React, { useState } from 'react';
import axios from 'axios';

interface BookingModalProps {
  hotel: { id: string; name: string; location: string; imageUrl: string } | null;
  show: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, show, onClose }) => {
  const [roomType, setRoomType] = useState('Standard');
  const [breakfast, setBreakfast] = useState(false);
  const [numNights, setNumNights] = useState(1);
  const [numGuests, setNumGuests] = useState(1);

  const handleBooking = async () => {
    if (!hotel) {
      console.error("Hotel is null or undefined");
      return;
    }

    const booking = {
      hotelId: parseInt(hotel.id, 10),
      roomType,
      breakfastIncluded: breakfast,
      numberOfNights: numNights,
      numberOfGuests: numGuests
    };

    try {
      const response = await axios.post('https://localhost:7288/api/Booking', booking);
      console.log('Booking successful:', response.data);
      alert('Booking successful!');
      onClose();
    } catch (error) {
      console.error('There was a problem with the booking:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book a Room</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Room Type</label>
              <select
                className="form-control"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="Standard">Standard (€100/night)</option>
                <option value="Deluxe">Deluxe (€150/night)</option>
                <option value="Suite">Suite (€200/night)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Nights</label>
              <input
                type="number"
                className="form-control"
                value={numNights}
                onChange={(e) => setNumNights(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                className="form-control"
                value={numGuests}
                onChange={(e) => setNumGuests(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={breakfast}
                  onChange={(e) => setBreakfast(e.target.checked)}
                />
                <label className="form-check-label">Breakfast (€15 per person per day)</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleBooking}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
