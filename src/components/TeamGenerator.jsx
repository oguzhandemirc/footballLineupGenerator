// components/TeamGenerator.js
import React, { useState, useEffect } from "react";
import PlayerService from "../services/playerService";
import TeamService from "../services/teamService";
import FootballField from "./FootballField";
import Modal from "./Modal";

const TeamGenerator = ({ token }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [showDiceAnimation, setShowDiceAnimation] = useState(false);
  const [stats, setStats] = useState({
    teamAavgDefans: null,
    teamAavgHucum: null,
    teamAavgScore: null,
    teamBavgDefans: null,
    teamBavgHucum: null,
    teamBavgScore: null,
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (isStatsModalOpen) {
      fetchStats();
    }
  }, [isStatsModalOpen]);

  const fetchPlayers = async () => {
    try {
      const response = await PlayerService.getPlayers(token);
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
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openStatsModal = () => {
    setIsStatsModalOpen(true);
  };

  const closeStatsModal = () => {
    setIsStatsModalOpen(false);
  };

  const handleGenerateTeams = async () => {
    await generateTeams();
    closeModal();
  };

  const generateTeams = async () => {
    if (selectedPlayerIds.length < 6) {
      setError("Takım oluşturmak için en az 6 oyuncu seçmeniz gerekiyor.");
      return;
    }

    try {
      const response = await TeamService.generateTeams(
        selectedPlayerIds,
        token
      );
      setTeams(response.data);
      setError("");

      // İstatistikleri sessionStorage'a kaydet
      const {
        teamA: {
          defenseAverageScore: teamAavgDefans,
          offenseAverageScore: teamAavgHucum,
          averageScore: teamAavgScore,
        },
        teamB: {
          defenseAverageScore: teamBavgDefans,
          offenseAverageScore: teamBavgHucum,
          averageScore: teamBavgScore,
        },
      } = response.data;

      sessionStorage.setItem("teamAavgDefans", teamAavgDefans);
      sessionStorage.setItem("teamAavgHucum", teamAavgHucum);
      sessionStorage.setItem("teamAavgScore", teamAavgScore);
      sessionStorage.setItem("teamBavgDefans", teamBavgDefans);
      sessionStorage.setItem("teamBavgHucum", teamBavgHucum);
      sessionStorage.setItem("teamBavgScore", teamBavgScore);

      // İstatistikleri state'e de güncelle
      setStats({
        teamAavgDefans,
        teamAavgHucum,
        teamAavgScore,
        teamBavgDefans,
        teamBavgHucum,
        teamBavgScore,
      });
    } catch (err) {
      console.error("Takımlar oluşturulurken hata oluştu:", err);
      setError("Takımlar oluşturulurken bir hata oluştu.");
    }
  };

  const fetchStats = () => {
    const teamAavgDefans = sessionStorage.getItem("teamAavgDefans");
    const teamAavgHucum = sessionStorage.getItem("teamAavgHucum");
    const teamAavgScore = sessionStorage.getItem("teamAavgScore");
    const teamBavgDefans = sessionStorage.getItem("teamBavgDefans");
    const teamBavgHucum = sessionStorage.getItem("teamBavgHucum");
    const teamBavgScore = sessionStorage.getItem("teamBavgScore");

    setStats({
      teamAavgDefans,
      teamAavgHucum,
      teamAavgScore,
      teamBavgDefans,
      teamBavgHucum,
      teamBavgScore,
    });
  };

  const handleSelectAll = () => {
    if (selectedPlayerIds.length === players.length) {
      setSelectedPlayerIds([]);
    } else {
      setSelectedPlayerIds(players.map((player) => player.id));
    }
  };

  const triggerDiceAnimation = () => {
    setShowDiceAnimation(true);
    setTimeout(() => {
      setShowDiceAnimation(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Butonları sağ alt köşeye sabitliyoruz */}
      <div className="fixed bottom-4 right-4 z-20 flex flex-col space-y-2">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Takımları Oluştur Butonu */}
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          {/* Yalnızca emoji mobilde görünecek */}
          <span role="img" aria-label="add player" className="mr-2">
            👤
          </span>
          <span className="hidden sm:inline">Takımları Oluştur</span>
        </button>
         
        {/* Tekrar Kar Butonu */}
        {teams && (
          <button
            onClick={() => {
              triggerDiceAnimation();
              generateTeams();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {/* Yalnızca emoji mobilde görünecek */}
            <span role="img" aria-label="dice" className="mr-2">
              🎲
            </span>
            <span className="hidden sm:inline">Tekrar Kar</span>
          </button>
        )}
        
        {/* İstatistikler Geniş Ekran */}
        <div>
          <div className="gap-4 bg-orange-400 rounded-lg p-2 shadow-xl sm:flex hidden ">
            <div className="border-r-2 pr-2 ">
              <p className="text-center ">
                <strong className="border-b-2">Takım A</strong>
              </p>
              <p>
                <span className="font-semibold">Defans </span>
                {stats.teamAavgDefans}
              </p>
              <p>
                <span className="font-semibold">Hücum </span>
                {stats.teamAavgHucum}
              </p>
              <p>
                <span className="font-semibold">Genel </span>
                {stats.teamAavgScore}
              </p>
            </div>
            <div>
              <p className="text-center">
                <strong className="border-b-2">Takım B</strong>
              </p>
              <p>
                <span className="font-semibold">Defans</span>{" "}
                {stats.teamBavgDefans}
              </p>
              <p>
                <span className="font-semibold">Hücum </span>
                {stats.teamBavgHucum}
              </p>
              <p>
                <span className="font-semibold">Genel </span>
                {stats.teamBavgScore}
              </p>
            </div>
          </div>
        </div>

        {/* İstatistikler Butonu - Mobilde Görünür */}
        {teams && (
          <button
            onClick={openStatsModal}
            className="sm:flex md:hidden bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {/* Yalnızca emoji mobilde görünecek */}
            <span role="img" aria-label="statistics" className="mr-2">
              📊
            </span>
            <span className="hidden sm:inline">İstatistikler</span>
          </button>
        )}
      </div>


      {/* Zar Atma Animasyonu */}
      {showDiceAnimation && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-6xl animate-spin">🎲</div>
        </div>
      )}

      {/* Modal - Oyuncu Seçimi */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Oyuncu Seçimi</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center p-2 border rounded"
            >
              <input
                type="checkbox"
                id={`player-${player.id}`}
                checked={selectedPlayerIds.includes(player.id)}
                onChange={() => handleCheckboxChange(player.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor={`player-${player.id}`} className="ml-2">
                {player.name} - {player.role} - Puan: {player.score}
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

      {/* Modal - İstatistikler */}
      <Modal isOpen={isStatsModalOpen} onClose={closeStatsModal}>
        <h2 className="text-xl font-bold mb-4">İstatistikler</h2>
        <div className="space-y-2">
          <p>
            <strong>Takım A:</strong>
          </p>
          <p>Defans Ortalaması: {stats.teamAavgDefans}</p>
          <p>Hücum Ortalaması: {stats.teamAavgHucum}</p>
          <p>Genel Ortalaması: {stats.teamAavgScore}</p>
          <p>
            <strong>Takım B:</strong>
          </p>
          <p>Defans Ortalaması: {stats.teamBavgDefans}</p>
          <p>Hücum Ortalaması: {stats.teamBavgHucum}</p>
          <p>Genel Ortalaması: {stats.teamBavgScore}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeStatsModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Kapat
          </button>
        </div>
      </Modal>

      {/* Sahanın içine FootballField bileşenini gömüyoruz */}
      <FootballField teams={teams} />
    </div>
  );
};

export default TeamGenerator;
