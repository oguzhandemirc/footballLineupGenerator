// src/components/Navbar.js
import React, { useState } from 'react';
import Popup from './Popup';
import PlayerForm from './PlayerForm';
import AuthService from '../services/authService';

const Navbar = ({ onLogout }) => {
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    onLogout();
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-3 shadow-md fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Halısaha Uygulaması</div>

        <div className="space-x-4">
          <button
            onClick={() => setShowPlayerForm(true)}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
          >
            Oyuncu Ekle
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Oyuncu Ekleme Popup */}
      {showPlayerForm && (
        <Popup onClose={() => setShowPlayerForm(false)}>
          <PlayerForm token={localStorage.getItem('token')} onPlayerAdded={() => setShowPlayerForm(false)} />
        </Popup>
      )}
    </nav>
  );
};

export default Navbar;
