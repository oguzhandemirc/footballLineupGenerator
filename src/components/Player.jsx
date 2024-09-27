// Player.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import grayCard from '../assets/yellow.webp';
import blueCard from '../assets/blue.webp';
import redCard from '../assets/red.webp';
import whiteCard from '../assets/white.webp';

const Player = ({ name, score, role, position, isPositionCorrect }) => {
  const getBackgroundImage = (score) => {
    if (score >= 90) return blueCard;
    if (score >= 82) return whiteCard;
    if (score >= 75) return redCard;
    return grayCard;
  };

  const getRoleLabel = (role) => {
    if (role.isGoalkeeper) {
      // Kalecinin gerçek mevkisini parantez içinde ekleyelim
      // return `GK (${role.role})`;
      return `GK`;
    }
    if (role.role === 'hucum') return 'SF'; // Hücum
    if (role.role === 'defans') return 'DF'; // Defans
    return ''; // Diğer roller için boş bırak
  };

  const backgroundImage = getBackgroundImage(score);
  const roleLabel = getRoleLabel(role);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'player',
    item: { position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drag preview'i kapat
  dragPreview(null);

  // Doğru pozisyonda olup olmadığını kontrol et ve kırmızı çerçeve ekle
  const borderColor = isPositionCorrect ? 'border-transparent' : 'border-red-500';

  const playerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={drag}
      className={`flex flex-col bg-opacity-0 items-center justify-center mb-2 p-4 transition transform hover:scale-110 border-4 w-[90px] sm:w-[180px] ${borderColor}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '205px', // Kart yüksekliği
      }}
      variants={playerVariants}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Oyuncu Bilgileri */}
        <div className='text-sm sm:text-xl' style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontFamily: 'Impact',
            }}
          >
            {name}
          </div>
          <div
            className='text-sm sm:text-xl'
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: 'Impact',
            }}
          >
            Puan: {score}
          </div>
          {roleLabel && (
            <div
              className='text-sm sm:text-xl'
              style={{
                textAlign: 'center',
                color: '#ffffff',
                fontFamily: 'Impact',
              }}
            >
              {roleLabel}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Player;
