import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import AddPlayer from "./components/AddPlayer";
import AddMatch from "./components/AddMatch";
import React from "react";

function App() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h2>Toeggele Elo Rankings</h2>

            <Leaderboard key={refresh ? "refresh1" : "refresh2"} />

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <AddPlayer onPlayerAdded={() => setRefresh(!refresh)} />
                <AddMatch onMatchAdded={() => setRefresh(!refresh)} />
            </div>
        </div>
    );
}

export default App;
