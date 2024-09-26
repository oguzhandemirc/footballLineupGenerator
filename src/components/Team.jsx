// Team.jsx
import React, { useState, useEffect } from 'react';
import Player from './Player';
import { motion } from 'framer-motion';

const Team = ({ teamName, initialPlayers }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const newPositions = [];
    const attackers = initialPlayers.filter(player => player.role === 'hucum');
    const defenders = initialPlayers.filter(player => player.role === 'defans' && !player.isGoalkeeper);
    const goalkeepers = initialPlayers.filter(player => player.isGoalkeeper);

    newPositions.push(attackers);
    newPositions.push(defenders);
    newPositions.push(goalkeepers);

    setPositions(newPositions);
  }, [initialPlayers]);

  // Oyuncu pozisyonunu değiştirme fonksiyonu
  const movePlayer = (fromPosition, toPosition) => {
    const newPositions = positions.map((row) => [...row]);
    const playerToMove = newPositions[fromPosition.row][fromPosition.col];
    newPositions[fromPosition.row][fromPosition.col] = newPositions[toPosition.row][toPosition.col];
    newPositions[toPosition.row][toPosition.col] = playerToMove;
    setPositions(newPositions);
  };

  // isPositionCorrect fonksiyonu
  const isPositionCorrect = (player, rowIndex) => {
    if (rowIndex === 0 && player.role !== 'hucum') return false;
    if (rowIndex === 1 && player.role !== 'defans') return false;
    if (rowIndex === 2 && !player.isGoalkeeper) return false;
    return true;
  };

  return (
    <motion.div className="relative w-full h-full p-2 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mt-4 mb-2 text-center">{teamName}</h2>

      {/* Beyaz çizgi */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white"></div>
      </div>

      {/* Hücum oyuncuları */}
      <div className="flex justify-center gap-2 pt-2 h-auto">
        {positions[0] && positions[0].map((player, colIndex) => (
          <motion.div key={colIndex}>
            <Player
              name={player.name}
              score={player.score}
              role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
              position={{ row: 0, col: colIndex }}
              movePlayer={movePlayer}
              isPositionCorrect={isPositionCorrect(player, 0)}
            />
          </motion.div>
        ))}
      </div>

      {/* Defans oyuncuları */}
      <div className="flex justify-center gap-2 pt-2">
        {positions[1] && positions[1].map((player, colIndex) => (
          <motion.div key={colIndex}>
            <Player
              name={player.name}
              score={player.score}
              role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
              position={{ row: 1, col: colIndex }}
              movePlayer={movePlayer}
              isPositionCorrect={isPositionCorrect(player, 1)}
            />
          </motion.div>
        ))}
      </div>

      {/* Kaleci */}
      <div className="flex justify-center mt-2">
        {positions[2] && positions[2][0] && (
          <motion.div>
            <Player
              name={positions[2][0].name}
              score={positions[2][0].score}
              role={{ role: positions[2][0].role, isGoalkeeper: positions[2][0].isGoalkeeper }}
              position={{ row: 2, col: 0 }}
              movePlayer={movePlayer}
              isPositionCorrect={isPositionCorrect(positions[2][0], 2)}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Team;
