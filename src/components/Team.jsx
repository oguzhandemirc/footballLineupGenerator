import React, { useState, useEffect } from 'react';
import Player from './Player';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

const Team = ({ teamName, initialPlayers }) => {
  const [positions, setPositions] = useState([
    initialPlayers.slice(4, 7),  // 3 hücum
    initialPlayers.slice(1, 4),  // 3 defans
    [initialPlayers[0]]          // 1 kaleci
  ]);

  useEffect(() => {
    setPositions([
      initialPlayers.slice(4, 7),  // 3 hücum
      initialPlayers.slice(1, 4),  // 3 defans
      [initialPlayers[0]]          // 1 kaleci
    ]);
  }, [initialPlayers]);

  // Oyuncu pozisyonunu değiştirme
  const movePlayer = (fromPosition, toPosition) => {
    const newPositions = positions.map((row) => [...row]);
    const playerToMove = newPositions[fromPosition.row][fromPosition.col];
    newPositions[fromPosition.row][fromPosition.col] = newPositions[toPosition.row][toPosition.col];
    newPositions[toPosition.row][toPosition.col] = playerToMove;
    setPositions(newPositions);
  };

  // Drop alanı yaratma
  const createDropZone = (toPosition) => {
    const [, drop] = useDrop({
      accept: 'player',
      drop: (draggedPlayer) => movePlayer(draggedPlayer.position, toPosition),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    return drop;
  };

  // Doğru pozisyon kontrolü
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
      <div className="flex justify-center gap-2 pt-2">
        {positions[0].map((player, colIndex) => (
          <motion.div key={colIndex} ref={createDropZone({ row: 0, col: colIndex })}>
            <Player
              name={player.name}
              score={player.score}
              role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
              position={{ row: 0, col: colIndex }}
              isPositionCorrect={isPositionCorrect(player, 0)}
            />
          </motion.div>
        ))}
      </div>

      {/* Defans oyuncuları */}
      <div className="flex justify-center gap-2 pt-2">
        {positions[1].map((player, colIndex) => (
          <motion.div key={colIndex} ref={createDropZone({ row: 1, col: colIndex })}>
            <Player
              name={player.name}
              score={player.score}
              role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
              position={{ row: 1, col: colIndex }}
              isPositionCorrect={isPositionCorrect(player, 1)}
            />
          </motion.div>
        ))}
      </div>

      {/* Kaleci */}
      <div className="flex justify-center mt-2">
        <motion.div ref={createDropZone({ row: 2, col: 0 })}>
          <Player
            name={positions[2][0].name}
            score={positions[2][0].score}
            role={{ role: positions[2][0].role, isGoalkeeper: positions[2][0].isGoalkeeper }}
            position={{ row: 2, col: 0 }}
            isPositionCorrect={isPositionCorrect(positions[2][0], 2)}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team;
