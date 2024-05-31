import React from 'react';
import HotelCard from './HotelCard.tsx';
import '../design/HoteList.css';

const HotelList: React.FC<{ hotels: any[] }> = ({ hotels }) => {
  return (
    <div className="container">
      <div className="row">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
