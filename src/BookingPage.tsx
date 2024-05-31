import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './design/BookingPage.css'

const BookingPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<null | { id: string; name: string; location: string; imageUrl: string }>(null);
  const [roomType, setRoomType] = useState('Standard');
  const [breakfast, setBreakfast] = useState(false);
  const [numNights, setNumNights] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`https://localhost:7288/api/Hotel/${hotelId}`).then((response) => {
      const hotelData = response.data;
      setHotel(hotelData);
      fetchRecommendations(hotelData.location);
    });
  }, [hotelId]);

  const fetchRecommendations = (location: string) => {
    const country = location.split(', ').pop();
    axios.get(`https://localhost:7288/api/Hotel/searchbycountry/${country}`).then((response) => {
      setRecommendations(response.data.filter((h: any) => h.id !== hotelId));
    });
  };

  const handleBooking = () => {
    if (!hotel) {
      console.error("Hotel is null or undefined");
      return;
    }

    const booking = {
      hotelId: hotel.id,
      roomType,
      breakfastIncluded: breakfast,
      numberOfNights: numNights,
      numberOfGuests: numGuests
    };

    axios.post('https://localhost:7288/api/Booking', booking).then(() => {
      alert('Booking successful!');
    });
  };

  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="booking-container">
      <div className="hotel-info">
        <h1>{hotel.name}</h1>
        <p>{hotel.location}</p>
        <img src={hotel.imageUrl} alt={hotel.name} className="hotel-image" />
      </div>
      <div className="booking-form">
        <h2>Book a Room</h2>
        <form>
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
            <label>Number of People</label>
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
          <button type="button" className="button_page" onClick={handleBooking}>Book Now</button>
        </form>
      </div>
      <div className="recommendations">
        <h2>Recommended Hotels in same country </h2>
        <div className="hotel-list">
          {recommendations.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.imageUrl} alt={hotel.name} className="hotel-image" />
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <a href={`/book/${hotel.id}`} className="button_card">Book it!</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
