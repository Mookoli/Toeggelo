import { useEffect, useState } from "react";
import { getPlayers, submitMatch } from "../api";
import { Player } from "../types";
import React from "react";

const AddMatch = ({ onMatchAdded }: { onMatchAdded: () => void }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [matchData, setMatchData] = useState({
        team1Player1: "",
        team1Player2: "",
        team2Player1: "",
        team2Player2: "",
        team1Score: 0,
        team2Score: 0
    });

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        setPlayers(await getPlayers());
    };

    const handleSubmitMatch = async () => {
        await submitMatch({
            team1: [matchData.team1Player1, matchData.team1Player2],
            team2: [matchData.team2Player1, matchData.team2Player2],
            team1Score: matchData.team1Score,
            team2Score: matchData.team2Score
        });
        onMatchAdded();
    };

    return (
        <div>
            <h2>⚽ Submit Match Result</h2>
            
            <label>Team 1 Player 1:</label>
            <select onChange={(e) => setMatchData({ ...matchData, team1Player1: e.target.value })}>
                <option value="">Select Player</option>
                {players.map(player => <option key={player.id} value={player.name}>{player.name}</option>)}
            </select>

            <label>Team 1 Player 2:</label>
            <select onChange={(e) => setMatchData({ ...matchData, team1Player2: e.target.value })}>
                <option value="">Select Player</option>
                {players.map(player => <option key={player.id} value={player.name}>{player.name}</option>)}
            </select>

            <label>Team 2 Player 1:</label>
            <select onChange={(e) => setMatchData({ ...matchData, team2Player1: e.target.value })}>
                <option value="">Select Player</option>
                {players.map(player => <option key={player.id} value={player.name}>{player.name}</option>)}
            </select>

            <label>Team 2 Player 2:</label>
            <select onChange={(e) => setMatchData({ ...matchData, team2Player2: e.target.value })}>
                <option value="">Select Player</option>
                {players.map(player => <option key={player.id} value={player.name}>{player.name}</option>)}
            </select>

            <label>Team 1 Score:</label>
            <input type="number" placeholder="Score" onChange={(e) => setMatchData({ ...matchData, team1Score: Number(e.target.value) })} />

            <label>Team 2 Score:</label>
            <input type="number" placeholder="Score" onChange={(e) => setMatchData({ ...matchData, team2Score: Number(e.target.value) })} />

            <button onClick={handleSubmitMatch}>Submit Match</button>
        </div>
    );
};

export default AddMatch;
