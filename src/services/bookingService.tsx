import axios from 'axios';

const API_URL = 'https://localhost:7288/api/Booking';

interface Booking {
  hotelId: number;
  roomType: number;  // Ensure this is number to match backend enum
  breakfastIncluded: boolean;
  numberOfNights: number;
  numberOfGuests: number;
}

export const bookHotelRoom = async (booking: Booking) => {
  const response = await axios.post(API_URL, booking);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
