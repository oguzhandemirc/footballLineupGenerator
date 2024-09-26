// TeamGenerator.jsx
import React, { useState, useEffect } from "react";
import PlayerService from "../services/playerService";
import TeamService from "../services/teamService";
import FootballField from "./FootballField";
import Modal from "./Modal"; // Modal bileşenini içe aktarın

const TeamGenerator = ({ token }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const openModal = () => {
    setIsModalOpen(true);
    setError(""); // Hata mesajını temizle
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateTeams = async () => {
    await generateTeams();
    closeModal();
  };

  const generateTeams = async () => {
    if (selectedPlayerIds.length < 6) {
      // Minimum 6 oyuncu gereklidir
      setError("Takım oluşturmak için en az 6 oyuncu seçmeniz gerekiyor.");
      return;
    }

    // if (![6, 7, 8].includes(selectedPlayerIds.length)) {
    //   setError("Takım oluşturmak için 6, 7 veya 8 oyuncu seçmelisiniz.");
    //   return;
    // }

    try {
      const response = await TeamService.generateTeams(selectedPlayerIds);
      console.log("Generated teams:", response.data);
      setTeams(response.data);
      setError("");
    } catch (err) {
      console.error("Takımlar oluşturulurken hata oluştu:", err);
      setError("Takımlar oluşturulurken bir hata oluştu.");
    }
  };

  const handleSelectAll = () => {
    if (selectedPlayerIds.length === players.length) {
      setSelectedPlayerIds([]);
    } else {
      setSelectedPlayerIds(players.map((player) => player.id));
    }
  };

  return (
     <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Takım Oluşturma</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex items-center">
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Takımları Oluştur
        </button>

        {/* 'Tekrar Kar' butonu */}
        {teams && (
          <button
            onClick={generateTeams}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Tekrar Kar
          </button>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Oyuncu Seçimi</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerateTeams}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Takımları Oluştur
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            İptal
          </button>
        </div>
      </Modal>

      {/* Takımlar oluşturulduktan sonra FootballField bileşenini göster */}
      {teams && <FootballField teams={teams} />}
    </div>
  );
};

export default TeamGenerator;
