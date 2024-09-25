import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import yellowCard from '../assets/yellow.webp';
import blueCard from '../assets/blue.webp';
import redCard from '../assets/red.webp';
import whiteCard from '../assets/white.webp';

const Player = ({ name, score, role, position, isPositionCorrect }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: { position }, // Oyuncunun pozisyonunu sürüklerken aktar
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Puan aralığına göre arka plan kartını belirleme
  const getBackgroundImage = (score) => {
    if (score >= 90) return blueCard;
    if (score >= 82) return whiteCard;
    if (score >= 75) return redCard;
    return yellowCard;
  };

  // Mevki uyumsuzluğu varsa kırmızı outline ekleyelim
  const borderColor = isPositionCorrect ? 'border-transparent' : 'border-red-500';

  const playerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const backgroundImage = getBackgroundImage(score);

  return (
    <motion.div
      ref={drag}
      className={`flex flex-col items-center justify-center p-2 transition transform hover:scale-105 border-4 ${borderColor}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '80px',
        height: '120px',
      }}
      variants={playerVariants}
    >
      <svg
        width="80"
        height="120"
        viewBox="0 0 80 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Oyuncu Bilgileri */}
        <text x="40" y="60" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="bold" fontFamily="Impact">
          {name}
        </text>
        <text x="40" y="80" textAnchor="middle" fontSize="10" fill="#ffffff" fontFamily="Impact">
          Puan: {score}
        </text>
        {role.role && (
          <text x="40" y="100" textAnchor="middle" fontSize="10" fill="#ffffff" fontFamily="Impact">
            {role.role}
          </text>
        )}
      </svg>
    </motion.div>
  );
};

export default Player;
