import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import BookingPage from './BookingPage.tsx';
import BookingsList from './components/BookingList.tsx';
import Header from './components/Header.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:hotelId" element={<BookingPage />} />
          <Route path="/bookings" element={<BookingsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
