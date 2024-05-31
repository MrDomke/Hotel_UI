import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from './components/HoteList.tsx';
import './design/SearchBar.css'

type Hotel = {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
};

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('https://localhost:7288/api/Hotel');
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels", error);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchCity(value);

    if (value === '') {
      const response = await axios.get('https://localhost:7288/api/Hotel');
      setHotels(response.data);
    } else {
      try {
        const response = await axios.get('https://localhost:7288/api/Hotel/search', {
          params: { city: value }
        });
        setHotels(response.data);
      } catch (error) {
        console.error("Error searching hotels", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={handleSearch}
          className="form-control me-2"
        />
      </div>
      <HotelList hotels={hotels} />
    </div>
  );
};

export default HomePage;
