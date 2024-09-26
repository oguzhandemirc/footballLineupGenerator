// src/components/TeamDisplay.js
import React from 'react';

const TeamDisplay = ({ teams }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Oluşturulan Takımlar</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Takım A</h3>
        <p>Oyuncu Sayısı: {teams.teamA.totalPlayers}</p>
        <p>Toplam Puan: {teams.teamA.totalScore}</p>
        <p>Ortalama Puan: {teams.teamA.averageScore}</p>
        <p>Hücum Ortalama Puan: {teams.teamA.offenseAverageScore}</p>
        <p>Defans Ortalama Puan: {teams.teamA.defenseAverageScore}</p>
        <ul className="list-disc list-inside mt-2">
          {teams.teamA.players.map((player) => (
            <li key={player.id}>
              {player.name} - {player.role} - Puan: {player.score}
              {player.isGoalkeeper && " (Kaleci)"}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Takım B</h3>
        <p>Oyuncu Sayısı: {teams.teamB.totalPlayers}</p>
        <p>Toplam Puan: {teams.teamB.totalScore}</p>
        <p>Ortalama Puan: {teams.teamB.averageScore}</p>
        <p>Hücum Ortalama Puan: {teams.teamB.offenseAverageScore}</p>
        <p>Defans Ortalama Puan: {teams.teamB.defenseAverageScore}</p>
        <ul className="list-disc list-inside mt-2">
          {teams.teamB.players.map((player) => (
            <li key={player.id}>
              {player.name} - {player.role} - Puan: {player.score}
              {player.isGoalkeeper && " (Kaleci)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDisplay;
