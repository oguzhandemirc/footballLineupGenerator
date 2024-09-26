import React, { useState } from 'react';
import Team from './Team';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from '../assets/abc.jpg';

const FootballField = ({ teams }) => {
  const [currentTeam, setCurrentTeam] = useState('A');

  // Log the teams to inspect them
  console.log('FootballField teams:', teams);

  if (!teams || (!teams.teamA && !teams.teamB)) {
    return <div>No teams available</div>;
  }

  const teamAPlayers = teams.teamA?.players || [];
  const teamBPlayers = teams.teamB?.players || [];

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-col items-center pt-2 w-full min-h-screen overflow-x-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-2xl font-bold sm:text-5xl pt-4 text-gray-200 text-center shadow-2xl">
          Halısaha Eşleşme Uygulaması
        </h1>

        {/* Team Area */}
        <div className="relative text-white bg-opacity-70 flex flex-col justify-center">
          {currentTeam === 'A' && teamAPlayers.length > 0 ? (
            <Team teamName="Takım A" initialPlayers={teamAPlayers} />
          ) : currentTeam === 'B' && teamBPlayers.length > 0 ? (
            <Team teamName="Takım B" initialPlayers={teamBPlayers} />
          ) : (
            <div>No players in this team</div>
          )}
        </div>

        {/* Team Switch Buttons */}
        <div className="mt-5 flex space-x-4">
          <button
            className={`px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg focus:outline-none ${
              currentTeam === 'A' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentTeam('A')}
            disabled={currentTeam === 'A'}
          >
            Takım A
          </button>
          <button
            className={`px-6 py-3 text-lg font-bold text-white bg-red-600 rounded-lg focus:outline-none ${
              currentTeam === 'B' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentTeam('B')}
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
