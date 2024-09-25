import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamGenerator = ({ token }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/players", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlayers(response.data);
    } catch (error) {
      console.error("Oyuncular alınırken hata oluştu:", error);
    }
  };

  const generateTeams = async () => {
    const selectedPlayerIds = players.map((player) => player.id);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/teams/generate",
        { playerIds: selectedPlayerIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams(response.data); // Takımları ayarla
    } catch (error) {
      console.error("Takımlar oluşturulurken hata oluştu:", error);
    }
  };

  return (
    <div>
      <h2>Oyuncular</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.role} - Puan: {player.score}
          </li>
        ))}
      </ul>
      <button onClick={generateTeams}>Takımları Oluştur</button>

      {teams && (
        <div>
          <h2>Takım A</h2>
          <ul>
            {teams.teamA.players.map((player) => (
              <li key={player.id}>
                {player.name} - {player.role} - Puan: {player.score}
              </li>
            ))}
          </ul>
          <h2>Takım B</h2>
          <ul>
            {teams.teamB.players.map((player) => (
              <li key={player.id}>
                {player.name} - {player.role} - Puan: {player.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamGenerator;
