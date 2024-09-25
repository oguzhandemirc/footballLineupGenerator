import React, { useState } from 'react';
import Player from './Player';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

const Team = ({ teamName, initialPlayers }) => {
  // 1-3-3 pozisyonları matriksi (ters): [ [hucum], [defans], [kaleci] ]
  const [positions, setPositions] = useState([
    initialPlayers.slice(4, 7),  // 3 hücum
    initialPlayers.slice(1, 4),  // 3 defans
    [initialPlayers[0]]          // 1 kaleci
  ]);

  const isPositionCorrect = (player, rowIndex) => {
    if (rowIndex === 0 && player.role !== 'hucum') return false;
    if (rowIndex === 1 && player.role !== 'defans') return false;
    if (rowIndex === 2 && !player.isGoalkeeper) return false;
    return true;
  };

  const movePlayer = (fromPosition, toPosition) => {
    const newPositions = positions.map((row) => [...row]);
    const playerToMove = newPositions[fromPosition.row][fromPosition.col];
    newPositions[fromPosition.row][fromPosition.col] = newPositions[toPosition.row][toPosition.col];
    newPositions[toPosition.row][toPosition.col] = playerToMove;
    setPositions(newPositions);
  };

  const createDropZone = (toPosition) => {
    const [, drop] = useDrop({
      accept: 'player',
      drop: (draggedPlayer) => movePlayer(draggedPlayer.position, toPosition),
    });
    return drop;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full h-full p-2 flex flex-col justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold mt-4 mb-2 text-center">{teamName}</h2>

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
