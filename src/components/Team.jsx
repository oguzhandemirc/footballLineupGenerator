// Team.jsx
import React from 'react';
import Player from './Player';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

const Team = ({ teamName, positions, setPositions }) => {
  // Oyuncuyu yeni hatta taşıma fonksiyonu
  const movePlayer = (fromPosition, toRowIndex) => {
    const newPositions = {
      attackers: [...positions.attackers],
      defenders: [...positions.defenders],
      goalkeepers: [...positions.goalkeepers],
    };

    // Eski pozisyondan oyuncuyu kaldır
    let player;
    if (fromPosition.row === 0) {
      player = newPositions.attackers.splice(fromPosition.col, 1)[0];
    } else if (fromPosition.row === 1) {
      player = newPositions.defenders.splice(fromPosition.col, 1)[0];
    } else if (fromPosition.row === 2) {
      player = newPositions.goalkeepers.splice(fromPosition.col, 1)[0];
    }

    // Oyuncunun rolünü güncelle
    let updatedPlayer = { ...player };
    if (toRowIndex === 0) {
      updatedPlayer.role = 'hucum';
      updatedPlayer.isGoalkeeper = false;
    } else if (toRowIndex === 1) {
      updatedPlayer.role = 'defans';
      updatedPlayer.isGoalkeeper = false;
    } else if (toRowIndex === 2) {
      updatedPlayer.role = 'defans';
      updatedPlayer.isGoalkeeper = true;
    }

    // Mevcut kaleciyle yer değiştirme
    if (toRowIndex === 2) {
      // Eğer mevcut bir kaleci varsa, onu defanslara geri gönder
      if (newPositions.goalkeepers.length > 0) {
        const oldGoalkeeper = newPositions.goalkeepers[0];
        oldGoalkeeper.isGoalkeeper = false;
        newPositions.defenders.push(oldGoalkeeper);
        newPositions.goalkeepers = []; // Kaleci pozisyonunu temizle
      }
    }

    // Güncellenmiş oyuncuyu yeni pozisyona ekle
    if (toRowIndex === 0) {
      newPositions.attackers.push(updatedPlayer);
    } else if (toRowIndex === 1) {
      newPositions.defenders.push(updatedPlayer);
    } else if (toRowIndex === 2) {
      newPositions.goalkeepers.push(updatedPlayer);
    }

    // Pozisyonları güncelle
    setPositions(newPositions);
  };

  // Her hat için drop hedefleri
  const [{ isOverAttackers }, dropAttackers] = useDrop({
    accept: 'player',
    drop: (item) => movePlayer(item.position, 0),
    collect: (monitor) => ({
      isOverAttackers: monitor.isOver(),
    }),
  });

  const [{ isOverDefenders }, dropDefenders] = useDrop({
    accept: 'player',
    drop: (item) => movePlayer(item.position, 1),
    collect: (monitor) => ({
      isOverDefenders: monitor.isOver(),
    }),
  });

  const [{ isOverGoalkeeper }, dropGoalkeeper] = useDrop({
    accept: 'player',
    drop: (item) => movePlayer(item.position, 2),
    collect: (monitor) => ({
      isOverGoalkeeper: monitor.isOver(),
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
          minHeight: '150px',
        }}
      >
        {positions.attackers &&
          positions.attackers.map((player, colIndex) => (
            <motion.div key={player.id}>
              <Player
                id={player.id}
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
          minHeight: '150px',
        }}
      >
        {positions.defenders &&
          positions.defenders.map((player, colIndex) => (
            <motion.div key={player.id}>
              <Player
                id={player.id}
                name={player.name}
                score={player.score}
                role={{ role: player.role, isGoalkeeper: player.isGoalkeeper }}
                position={{ row: 1, col: colIndex }}
              />
            </motion.div>
          ))}
      </div>

      {/* Kaleci */}
      <div
        ref={dropGoalkeeper}
        className="flex justify-center mt-2"
        style={{
          borderTop: isOverGoalkeeper ? '2px dashed orange' : '2px solid transparent',
          backgroundColor: isOverGoalkeeper ? 'rgba(255, 165, 0, 0.1)' : 'transparent',
          minHeight: '150px',
        }}
      >
        {positions.goalkeepers && positions.goalkeepers[0] ? (
          <motion.div>
            <Player
              id={positions.goalkeepers[0].id}
              name={positions.goalkeepers[0].name}
              score={positions.goalkeepers[0].score}
              role={{
                role: positions.goalkeepers[0].role,
                isGoalkeeper: positions.goalkeepers[0].isGoalkeeper,
              }}
              position={{ row: 2, col: 0 }}
              draggable={false}
            />
          </motion.div>
        ) : (
          <div style={{ color: 'white', textAlign: 'center' }}>Kaleci Yok</div>
        )}
      </div>
    </motion.div>
  );
};

export default Team;
