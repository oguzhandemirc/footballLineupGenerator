import React, { useState } from 'react';
import Popup from './Popup';
import PlayerForm from './PlayerForm';
import AuthService from '../services/authService';

const Navbar = ({ onLogout }) => {
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    
    AuthService.logout();
    onLogout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Hamburger Icon (with square background) */}
      <div className="fixed right-3 top-2 h-20  z-20">
        <button
          onClick={toggleMenu}
          className="bg-blue-500 p-3 rounded-lg text-white focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white text-black shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 w-64 z-20`}
      >
        {/* Close Button Inside the Menu */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menü</h2>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => {
              setShowPlayerForm(true);
              toggleMenu();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Oyuncu Ekle
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
    </div>
  );
};

export default Navbar;
