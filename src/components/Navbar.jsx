import React, { useState } from 'react';
import PlayerForm from './PlayerForm'; // Oyuncu ekleme popup için

const Navbar = ({ onLogout }) => {
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-3 shadow-md fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Halısaha Uygulaması</div>

        <div className="md:space-x-4">
          <button
            onClick={() => setShowPlayerForm(true)}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 w-40"
          >
            Oyuncu Ekle
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-40"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Oyuncu Ekleme Popup */}
      {showPlayerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-slate-300  p-8 rounded-2xl shadow-md max-w-md w-full">
            <h2 className="text-xl text-black font-bold mb-4">Oyuncu Ekle</h2>
            <PlayerForm token={localStorage.getItem('token')} onPlayerAdded={() => setShowPlayerForm(false)} />
            <button
              onClick={() => setShowPlayerForm(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
