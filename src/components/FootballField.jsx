import React, { useState } from 'react';
import Team from './Team';
import { teamA, teamB } from '../data/teams';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from '../assets/abc.jpg'; // Import the background image

const FootballField = () => {
  const [currentTeam, setCurrentTeam] = useState('A'); // Varsayılan olarak Takım A'yı göster

  // Takım değiştirme fonksiyonu
  const handleTeamSwitch = (team) => {
    setCurrentTeam(team);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-col items-center pt-2 w-full min-h-screen overflow-x-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Use background image
          backgroundSize: 'cover', // Make sure the image covers the whole area
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        }}
      >
        <h1 className="text-2xl font-bold sm:text-5xl pt-4 text-gray-200  text-center shadow-2xl ">
          Halısaha Eşleşme Uygulaması
        </h1>

        {/* Takım alanı */}
        <div className="relative text-white bg-opacity-70 flex flex-col justify-center">
          {currentTeam === 'A' ? (
            <Team teamName="Takım A" initialPlayers={teamA} />
          ) : (
            <Team teamName="Takım B" initialPlayers={teamB} />
          )}
        </div>

        {/* Takım geçiş butonları */}
        <div className="mt-5 flex space-x-4">
          <button
            className={`px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg focus:outline-none ${
              currentTeam === 'A' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleTeamSwitch('A')}
            disabled={currentTeam === 'A'}
          >
            Takım A
          </button>
          <button
            className={`px-6 py-3 text-lg font-bold text-white bg-red-600 rounded-lg focus:outline-none ${
              currentTeam === 'B' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleTeamSwitch('B')}
            disabled={currentTeam === 'B'}
          >
            Takım B
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default FootballField;
