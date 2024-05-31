import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookHotelRoom } from '../services/bookingService.tsx';


const BookingForm: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const parsedHotelId = hotelId ? parseInt(hotelId, 10) : 0;

  const [bookingDetails, setBookingDetails] = useState<any>({
    hotelId: parsedHotelId,
    roomType: 0, 
    breakfastIncluded: false,
    numberOfNights: 1,
    numberOfGuests: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: name === "roomType" ? parseInt(value, 10) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await bookHotelRoom(bookingDetails);
      alert('Booking successful!');
    } catch (error) {
      alert('There was a problem with the booking');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room Type:
        <select name="roomType" value={bookingDetails.roomType} onChange={handleChange}>
          <option value={0}>Standard</option>
          <option value={1}>Deluxe</option>
          <option value={2}>Suite</option>
        </select>
      </label>
      <label>
        Breakfast Included:
        <input
          type="checkbox"
          name="breakfastIncluded"
          checked={bookingDetails.breakfastIncluded}
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Number of Nights:
        <input
          type="number"
          name="numberOfNights"
          value={bookingDetails.numberOfNights}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Guests:
        <input
          type="number"
          name="numberOfGuests"
          value={bookingDetails.numberOfGuests}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="btn btn-primary">Book</button>
    </form>
  );
};

export default BookingForm;
