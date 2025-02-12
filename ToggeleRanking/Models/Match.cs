namespace ToggeleRanking.Models
{
    public class Match
    {
        public int Id { get; set; }
        public Team? Team1 { get; set; }
        public Team? Team2 { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
    
    public record Team(int Player1Id, int Player2Id);
}