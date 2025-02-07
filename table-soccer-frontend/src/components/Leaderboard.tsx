import { useEffect, useState } from "react";
import { getPlayers } from "../api";
import { Player } from "../types";
import React from "react";

const Leaderboard = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        const data = await getPlayers();
        setPlayers(data);
    };

    const filteredPlayers = players
        .filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.rating - a.rating) // Sort by Elo rating (descending)
        .slice(0, 10); // Show only top 10

    return (
        <div>
            <h2>🏆 Top 10 Players</h2>
            <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ol>
                {filteredPlayers.map((player, index) => (
                    <li key={player.id}>
                        {index + 1}. {player.name} - Elo: {player.rating}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
