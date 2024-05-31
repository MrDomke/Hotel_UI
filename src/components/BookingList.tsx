import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../design/BookingList.css';

export interface Booking {
  id: number;
  hotelName: string;
  hotelLocation: string;
  hotelImageUrl: string;
  roomType: string;
  numberOfNights: number;
  numberOfGuests: number;
  breakfastIncluded: boolean;
  totalCost: number;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('https://localhost:7288/api/Booking');
      const bookingData = response.data;
      
      const hotelRequests = bookingData.map((booking: any) =>
        axios.get(`https://localhost:7288/api/Hotel/${booking.hotelId}`)
      );
      const hotelResponses = await Promise.all(hotelRequests);

      const bookingsWithHotelDetails = bookingData.map((booking: any, index: number) => {
        const hotel = hotelResponses[index].data;
        return {
          ...booking,
          hotelName: hotel.name,
          hotelLocation: hotel.location,
          hotelImageUrl: hotel.imageUrl,
        };
      });

      setBookings(bookingsWithHotelDetails);
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="list-group">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="booking-details">
                  <h5 className="mb-1">{booking.hotelName}</h5>
                  <p className="mb-1">{booking.hotelLocation}</p>
                  <p className="mb-1">Room: {booking.roomType}</p>
                  <p className="mb-1">Nights: {booking.numberOfNights}</p>
                  <p className="mb-1">Guests: {booking.numberOfGuests}</p>
                  <p className="mb-1">Breakfast: {booking.breakfastIncluded ? 'Yes' : 'No'}</p>
                </div>
                <img src={booking.hotelImageUrl} alt={booking.hotelName} className="hotel-image" />
                <small className="text-muted">Total: €{booking.totalCost}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default BookingList;
