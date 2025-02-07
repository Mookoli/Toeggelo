namespace ToggleRanking
{
    public static class EloCalculator
    {
        public static List<int> Calculate(List<int> teamRatings, List<int> opponentRatings, int outcome)
        {
            double kFactor = 32;
            List<int> newRatings = new();

            double teamAverage = teamRatings.Average();
            double opponentAverage = opponentRatings.Average();

            foreach (var rating in teamRatings)
            {
                double expectedScore = 1.0 / (1.0 + Math.Pow(10, (opponentAverage - teamAverage) / 400.0));

                int newRating = (int)(rating + kFactor * (outcome - expectedScore));
                newRatings.Add(newRating);
            }

            return newRatings;
        }
    }
}
