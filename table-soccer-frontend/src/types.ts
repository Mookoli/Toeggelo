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
    team1: string[];
    team2: string[];
    team1Score: number;
    team2Score: number;
    date: string;
}
