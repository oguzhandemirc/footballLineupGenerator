import React, { useState, useEffect } from "react";
import PlayerService from "../services/playerService";
import TeamDisplay from "./TeamDisplay";
import TeamService from "../services/teamService";
import FootballField from './FootballField';

const TeamGenerator = ({ token }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await PlayerService.getPlayers();
      setPlayers(response.data);
    } catch (err) {
      console.error("Oyuncular alınırken hata oluştu:", err);
      setError("Oyuncular alınırken bir hata oluştu.");
    }
  };

  const handleCheckboxChange = (playerId) => {
    setSelectedPlayerIds((prevIds) =>
      prevIds.includes(playerId)
        ? prevIds.filter((id) => id !== playerId)
        : [...prevIds, playerId]
    );
  };

  const generateTeams = async () => {
    if (selectedPlayerIds.length < 6) { // Minimum 6 oyuncu gereklidir
      setError("Takım oluşturmak için en az 6 oyuncu seçmeniz gerekiyor.");
      return;
    }

    // if (![6, 7, 8].includes(selectedPlayerIds.length)) {
    //   setError("Takım oluşturmak için 6, 7 veya 8 oyuncu seçmelisiniz.");
    //   return;
    // }

    try {
      const response = await TeamService.generateTeams(selectedPlayerIds);
      setTeams(response.data);
      setError("");
      console.log('Generated teams:', response.data);
    } catch (err) {
      console.error("Takımlar oluşturulurken hata oluştu:", err);
      setError("Takımlar oluşturulurken bir hata oluştu.");
    }
  };

  const handleSelectAll = () => {
    if (selectedPlayerIds.length === players.length) {
      setSelectedPlayerIds([]);
    } else {
      setSelectedPlayerIds(players.map(player => player.id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Takım Oluşturma</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex items-center">
        <button
          onClick={generateTeams}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Takımları Oluştur
        </button>

        <button
          onClick={handleSelectAll}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          {selectedPlayerIds.length === players.length ? "Seçimleri Kaldır" : "Tümünü Seç"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {players.map((player) => (
          <div key={player.id} className="flex items-center p-2 border rounded">
            <input
              type="checkbox"
              id={`player-${player.id}`}
              checked={selectedPlayerIds.includes(player.id)}
              onChange={() => handleCheckboxChange(player.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor={`player-${player.id}`} className="ml-2">
              {player.name} - {player.role} - Puan: {player.score}
              {player.isGoalkeeper && " (Kaleci)"}
            </label>
          </div>
        ))}
      </div>

      {/* Render FootballField with the generated teams */}
      {teams && <FootballField teams={teams} />}
    </div>
  );
};

export default TeamGenerator;
