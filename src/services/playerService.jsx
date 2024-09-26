// src/services/playerService.js
import axios from 'axios';
import authHeader from '../utils/authHeader';

const API_URL = 'http://localhost:5005/api/players/';

class PlayerService {
  getPlayers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  addPlayer(playerData) {
    return axios.post(API_URL, playerData, { headers: authHeader() });
  }
}

export default new PlayerService();
