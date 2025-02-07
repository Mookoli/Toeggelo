namespace ToggeleRanking.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; } = 1000; // Default Elo rating
    }
}