using Microsoft.EntityFrameworkCore;
using ToggeleRanking;
using ToggeleRanking.Models;

public static class MatchEndpoints
{
    public static void MapMatchEndpoints(this WebApplication app)
    {
        app.MapGet("/matches", async (ApplicationDbContext db) =>
        {
            return Results.Ok(await db.Matches.ToListAsync());
        });

        app.MapPost("/matches", async (ApplicationDbContext db, MatchSubmissionDto matchDto) =>
        {
            var team1Players = await db.Players.Where(p => matchDto.Team1.Contains(p.Name)).ToListAsync();
            var team2Players = await db.Players.Where(p => matchDto.Team2.Contains(p.Name)).ToListAsync();

            if (team1Players.Count != 2 || team2Players.Count != 2)
                return Results.BadRequest("Invalid player names.");

            var match = new Match
            {
                Team1 = new Team(team1Players[0].Id, team1Players[1].Id),
                Team2 = new Team(team2Players[0].Id, team2Players[1].Id),
                Team1Score = matchDto.Team1Score,
                Team2Score = matchDto.Team2Score
            };

            db.Matches.Add(match);
            await db.SaveChangesAsync();

            return Results.Ok();
        });
    }
}

public class MatchSubmissionDto
{
    public List<string> Team1 { get; set; }
    public List<string> Team2 { get; set; }
    public int Team1Score { get; set; }
    public int Team2Score { get; set; }
}
