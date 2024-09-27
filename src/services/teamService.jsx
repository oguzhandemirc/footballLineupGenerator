// src/services/teamService.js
import axios from 'axios';
import authHeader from '../utils/authHeader';

const API_URL = 'http://localhost:5005/api/teams/';

class TeamService {
  generateTeams(playerIds) {
    return axios.post(API_URL + 'generate', { playerIds }, { headers: authHeader() });
  }
}

export default new TeamService();