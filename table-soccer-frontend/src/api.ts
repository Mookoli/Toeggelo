import axios from "axios";
import { Player, Match } from "./types";

const API_URL = "http://localhost:5244"; // Adjust to match your backend

export const getPlayers = async (): Promise<Player[]> => {
    const response = await axios.get(`${API_URL}/players`);
    return response.data;
};

export const addPlayer = async (name: string): Promise<void> => {
    await axios.post(`${API_URL}/players`, { name });
};

export const getMatches = async (): Promise<Match[]> => {
    const response = await axios.get(`${API_URL}/matches`);
    return response.data;
};

export const submitMatch = async (match: { team1: string[], team2: string[], team1Score: number, team2Score: number }): Promise<void> => {
    await axios.post(`${API_URL}/matches`, match);
};
