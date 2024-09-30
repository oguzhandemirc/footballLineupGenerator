// src/components/PlayerForm.jsx
import React, { useState } from "react";
import PlayerService from "../services/playerService";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const PlayerForm = ({ token, onPlayerAdded }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(50);
  const [role, setRole] = useState("hucum");
  const [isGoalkeeper, setIsGoalkeeper] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericScore = Number(score);
    if (numericScore < 0 || numericScore > 100) {
      toast.error("Puan 0 ile 100 arasında olmalıdır.", {
        position: "bottom-left",
        autoClose: 500,
      });
      return;
    }
    const fetchPlayers = async () => {
      try {
        const response = await PlayerService.getPlayers(token);
        setPlayers(response.data);
      } catch (err) {
        console.error("Oyuncular alınırken hata oluştu:", err);
        toast.error("Oyuncular alınırken bir hata oluştu.", {
          autoClose: 500,
          position: "bottom-left",
        });
      }
    };
    try {
      const response = await PlayerService.addPlayer({
        name,
        score: numericScore,
        role,
        isGoalkeeper,
      });
      onPlayerAdded(response.data);
      setName("");
      setScore(50);
      setRole("hucum");
      setIsGoalkeeper(false);
      
      toast.success("Oyuncu başarıyla eklendi!", {
        position: "bottom-left",
        autoClose: 500,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Oyuncu eklenirken bir hata oluştu",
        { position: "bottom-left", autoClose: 500 }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Oyuncu Adı
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Oyuncu adını girin"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Puan
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="0-100 arasında puan girin"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rol
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="hucum">Hücum</option>
          <option value="defans">Defans</option>
        </select>
      </div>

      <div className="flex items-center">
        {/* <label className="block text-gray-700 text-sm font-bold mr-2">
          Kaleci mi?
        </label>
        <input
          type="checkbox"
          checked={isGoalkeeper}
          onChange={() => setIsGoalkeeper(!isGoalkeeper)}
          className="form-checkbox h-5 w-5 text-blue-600"
        /> */}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Oyuncu Ekle
      </button>
    </form>
  );
};

export default PlayerForm;
