export interface Player {
    id: number;
    name: string;
    rating: number;
}

export interface Team {
    player1Id: number;
    player2Id: number;
}

export interface Match {
    id: number;
    team1: Team;
    team2: Team;
    team1Score: number;
    team2Score: number;
    date: string;
}
