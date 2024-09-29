// src/services/teamService.js
import axios from 'axios';
import authHeader from '../utils/authHeader';

const API_URL = 'https://api.kadrom.com.tr/api/teams/';

class TeamService {
  generateTeams(playerIds) {
    return axios.post(API_URL + 'generate', { playerIds }, { headers: authHeader() });
  }
}

export default new TeamService();