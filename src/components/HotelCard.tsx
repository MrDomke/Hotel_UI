import React from 'react';
import { Link } from 'react-router-dom';
import '../design/HotelCard.css';

const HotelCard: React.FC<{ hotel: any }> = ({ hotel }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 hotel-card">
        <img src={hotel.imageUrl} className="card-img-top hotel-image" alt={hotel.name} />
        <div className="card-body">
          <h5 className="card-title hotel-name">{hotel.name}</h5>
          <p className="card-text hotel-location">{hotel.location}</p>
          <Link to={`/book/${hotel.id}`} className="button_card">Book it!</Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
