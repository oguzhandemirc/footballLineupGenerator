// FootballField.jsx
import React, { useState } from "react";
import Team from "./Team";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../assets/abc.jpg";

const FootballField = ({ teams }) => {
  const [currentTeam, setCurrentTeam] = useState("A");

  if (!teams || (!teams.teamA && !teams.teamB)) {
    return <div></div>;
  }

  const teamAPlayers = teams.teamA?.players || [];
  const teamBPlayers = teams.teamB?.players || [];

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Üst Kısma Sabitlenmiş Başlık */}
        <div className="fixed top-0 left-0 w-full flex flex-col items-center py-2 bg-opacity-60 bg-black z-10">
          {/* Takım Seçme Butonları */}
          <div className="flex space-x-4 ">
            <button
              className={`px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg focus:outline-none ${
                currentTeam === "A" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentTeam("A")}
              disabled={currentTeam === "A"}
            >
              Takım A
            </button>
            <button
              className={`px-6 py-3 text-lg font-bold text-white bg-red-600 rounded-lg focus:outline-none ${
                currentTeam === "B" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentTeam("B")}
              disabled={currentTeam === "B"}
            >
              Takım B
            </button>
          </div>
        </div>

        {/* Takım Alanı (Saha) */}
        <div className="flex flex-col justify-end items-center w-full min-h-screen pt-24">
          {/* pt-24 => üstteki sabitlenen header'ın altında biraz boşluk bırakmak için */}
          <div className="relative text-white bg-opacity-70 flex flex-col justify-end mb-5">
            {currentTeam === "A" && teamAPlayers.length > 0 ? (
              <Team teamName="Takım A" initialPlayers={teamAPlayers} />
            ) : currentTeam === "B" && teamBPlayers.length > 0 ? (
              <Team teamName="Takım B" initialPlayers={teamBPlayers} />
            ) : (
              <div>Bu takımda oyuncu yok</div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default FootballField;
