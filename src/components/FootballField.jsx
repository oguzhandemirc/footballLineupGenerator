import React, { useState } from 'react';
import Team from './Team';
import { teamA, teamB } from '../data/teams';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FootballField = () => {
  const [currentTeam, setCurrentTeam] = useState('A'); // Varsayılan olarak Takım A'yı göster

  // Takım değiştirme fonksiyonu
  const handleTeamSwitch = (team) => {
    setCurrentTeam(team);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-5 bg-green-700 min-h-screen">
        <h1 className="text-5xl font-bold text-white mb-10 text-center">Halısaha Eşleşme Uygulaması</h1>

        {/* Takım alanı */}
        <div className="relative w-full sm:w-3/4 h-auto bg-green-500 border-4 border-white rounded-lg shadow-lg flex flex-col justify-center p-12">
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
