import React from 'react';
import Team from './Team';
import { teamA, teamB } from '../data/teams';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FootballField = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-5 bg-green-700 min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-5 text-center">Halısaha Eşleşme Uygulaması</h1>
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 space-x-0 lg:space-x-10 w-full justify-center place-items-center">
          {/* Takım A Sahası */}
          <div className="relative px-0 sm:px-6 md:w-auto h-120 md:h-full bg-green-500 border-2 border-white rounded-lg shadow-lg flex flex-col justify-center">
            <Team teamName="Takım A" initialPlayers={teamA} />
          </div>
          {/* Takım B Sahası */}
          <div className="relative px-0 sm:px-6 w-auto h-120 md:h-full bg-green-500 border-2 border-white rounded-lg shadow-lg flex flex-col justify-center">
            <Team teamName="Takım B" initialPlayers={teamB} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default FootballField;
