import { useState } from "react";
import { addPlayer } from "../api";
import React from "react";

const AddPlayer = ({ onPlayerAdded }: { onPlayerAdded: () => void }) => {
    const [newPlayer, setNewPlayer] = useState("");

    const handleAddPlayer = async () => {
        if (!newPlayer.trim()) return;
        await addPlayer(newPlayer);
        setNewPlayer("");
        onPlayerAdded(); // Refresh leaderboard
    };

    return (
        <div>
            <h2>➕ Add New Player</h2>
            <input
                type="text"
                placeholder="Enter player name"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
            />
            <button onClick={handleAddPlayer}>Add Player</button>
        </div>
    );
};

export default AddPlayer;
