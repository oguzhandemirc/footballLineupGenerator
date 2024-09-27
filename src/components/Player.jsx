// Player.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import blackCard from "../assets/black.webp";
import blueCard from "../assets/blue.webp";
import redCard from "../assets/red.webp";
import whiteCard from "../assets/white.webp";
import pinkCard from "../assets/pink.webp";
import bronzeCard from "../assets/bronze.webp";
import grayCard from "../assets/gray.webp";
import orangeCard from "../assets/orange.webp";

const Player = ({ id, name, score, role, position, draggable = true }) => {
  const getBackgroundImage = (score) => {
    if (score >= 90) return blueCard;
    if (score >= 85) return whiteCard;
    if (score >= 80) return blackCard;
    if (score >= 75) return orangeCard;
    if (score >= 70) return bronzeCard;
    if (score >= 60) return grayCard;
    return grayCard;
  };

  const getRoleLabel = (role) => {
    if (role.isGoalkeeper) {
      return "GK";
    }
    if (role.role === "hucum") return "SF"; // Forvet
    if (role.role === "defans") return "DF"; // Defans
    return "";
  };

  const backgroundImage = getBackgroundImage(score);
  const roleLabel = getRoleLabel(role);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "player",
    item: { position },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drag önizlemesini kapat
  dragPreview(null);

  const playerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={draggable ? drag : null}
      className="flex flex-col bg-opacity-0 items-center justify-center mb-2 p-4 transition transform hover:scale-110  w-[90px] sm:w-[180px]"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "205px", // Kart yüksekliği
      }}
      variants={playerVariants}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Oyuncu Bilgileri */}
        <div
          className="text-sm sm:text-xl"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
          }}
        >
          <div
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
              fontFamily: "Impact",
            }}
          >
            {name}
          </div>
          <div className="flex  justify-between flex-row-reverse px-10 pt-16 ">
            <div
              className="text-sm sm:text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontFamily: "Impact",
              }}
            >
              {score}
            </div>
            {roleLabel && (
              <div
                className="text-sm sm:text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontFamily: "Impact",
                }}
              >
                {roleLabel}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;
