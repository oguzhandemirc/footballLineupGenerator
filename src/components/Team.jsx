// Team.jsx
import React, { useState, useEffect } from 'react';
import Player from './Player';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

const Team = ({ teamName, initialPlayers }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const newPositions = [];
    const attackers = initialPlayers.filter(
      (player) => player.role === 'hucum' && !player.isGoalkeeper
    );
    const defenders = initialPlayers.filter(
      (player) => player.role === 'defans' && !player.isGoalkeeper
    );
    const goalkeepers = initialPlayers.filter((player) => player.isGoalkeeper);

    newPositions[0] = attackers;
    newPositions[1] = defenders;
    newPositions[2] = goalkeepers;

    setPositions(newPositions);
  }, [initialPlayers]);

  // Oyuncuyu yeni hatta taşıma
  const movePlayer = (fromPosition, toRowIndex) => {
    const newPositions = positions.map((row) => [...row]);

    // Oyuncuyu eski konumundan kaldır
    const player = newPositions[fromPosition.row][fromPosition.col];
    newPositions[fromPosition.row].splice(fromPosition.col, 1);

    // Oyuncunun rolünü güncelle
    let updatedPlayer = { ...player };
    if (toRowIndex === 0) {
      updatedPlayer.role = 'hucum';
      updatedPlayer.isGoalkeeper = false;
    } else if (toRowIndex === 1) {
      updatedPlayer.role = 'defans';
      updatedPlayer.isGoalkeeper = false;
    }

    // Oyuncuyu yeni hatta ekle
    newPositions[toRowIndex].push(updatedPlayer);

    setPositions(newPositions);
  };

  // Hücum hattı için drop hedefi
  const [{ isOver: isOverAttackers }, dropAttackers] = useDrop({
    accept: 'player',
    drop: (item) => movePlayer(item.position, 0),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Defans hattı için drop hedefi
  const [{ isOver: isOverDefenders }, dropDefenders] = useDrop({
    accept: 'player',
    drop: (item) => movePlayer(item.position, 1),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <motion.div className="relative w-full h-full p-2 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mt-4 mb-2 text-center">{teamName}</h2>

      {/* Hücum oyuncuları */}
      <div
        ref={dropAttackers}
        className="flex justify-center gap-2 pt-2 h-auto"
        style={{
          borderTop: isOverAttackers ? '2px dashed green' : '2px solid transparent',
          backgroundColor: isOverAttackers ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
          minHeight: '150px', // Hücum hattının yüksekliği
        }}
      >
        {positions[0] &&
          positions[0].map((player, colIndex) => (
            <motion.div key={player.id}>
              <Player
                name={player.name}
                score={player.score}
                role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
                position={{ row: 0, col: colIndex }}
              />
            </motion.div>
          ))}
      </div>

      {/* Defans oyuncuları */}
      <div
        ref={dropDefenders}
        className="flex justify-center gap-2 pt-2"
        style={{
          borderTop: isOverDefenders ? '2px dashed blue' : '2px solid transparent',
          backgroundColor: isOverDefenders ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
          minHeight: '150px', // Defans hattının yüksekliği
        }}
      >
        {positions[1] &&
          positions[1].map((player, colIndex) => (
            <motion.div key={player.id}>
              <Player
                name={player.name}
                score={player.score}
                role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
                position={{ row: 1, col: colIndex }}
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
              role={{
                role: positions[2][0].role,
                isGoalkeeper: positions[2][0].isGoalkeeper,
              }}
              position={{ row: 2, col: 0 }}
              draggable={false}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Team;
