import { useEffect, useState } from "react";
import { getPlayers, addPlayer, getMatches, submitMatch } from "./api";
import { Player, Match } from "./types";
import React from "react";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [newPlayer, setNewPlayer] = useState("");
    const [matchData, setMatchData] = useState({
        team1Player1Id: "",
        team1Player2Id: "",
        team2Player1Id: "",
        team2Player2Id: "",
        team1Score: 0,
        team2Score: 0
    });

    useEffect(() => {
        loadPlayers();
        loadMatches();
    }, []);

    const loadPlayers = async () => {
        setPlayers(await getPlayers());
    };

    const loadMatches = async () => {
        setMatches(await getMatches());
    };

    const handleAddPlayer = async () => {
        if (!newPlayer.trim()) return;
        await addPlayer(newPlayer);
        setNewPlayer("");
        loadPlayers();
    };

    const handleSubmitMatch = async () => {
        const match = {
            team1: { player1Id: Number(matchData.team1Player1Id), player2Id: Number(matchData.team1Player2Id) },
            team2: { player1Id: Number(matchData.team2Player1Id), player2Id: Number(matchData.team2Player2Id) },
            team1Score: Number(matchData.team1Score),
            team2Score: Number(matchData.team2Score)
        };
        await submitMatch(match);
        loadMatches();
    };

    return (
        <div>
            <h1>Table Soccer Rankings</h1>

            <h2>Players</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>{player.name} - Elo: {player.rating}</li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="New player name"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
            />
            <button onClick={handleAddPlayer}>Add Player</button>

            <h2>Submit Match</h2>
            <input type="number" placeholder="Team 1 Player 1 ID" onChange={(e) => setMatchData({ ...matchData, team1Player1Id: e.target.value })} />
            <input type="number" placeholder="Team 1 Player 2 ID" onChange={(e) => setMatchData({ ...matchData, team1Player2Id: e.target.value })} />
            <input type="number" placeholder="Team 2 Player 1 ID" onChange={(e) => setMatchData({ ...matchData, team2Player1Id: e.target.value })} />
            <input type="number" placeholder="Team 2 Player 2 ID" onChange={(e) => setMatchData({ ...matchData, team2Player2Id: e.target.value })} />
            <input type="number" placeholder="Team 1 Score" onChange={(e) => setMatchData({ ...matchData, team1Score: Number(e.target.value) })} />
            <input type="number" placeholder="Team 2 Score" onChange={(e) => setMatchData({ ...matchData, team2Score: Number(e.target.value) })} />
            <button onClick={handleSubmitMatch}>Submit Match</button>

            <h2>Match History</h2>
            <ul>
                {matches.map((match, index) => (
                    <li key={index}>Match {match.id}: Team 1 ({match.team1.player1Id}, {match.team1.player2Id}) vs Team 2 ({match.team2.player1Id}, {match.team2.player2Id}) - {match.team1Score}:{match.team2Score}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
