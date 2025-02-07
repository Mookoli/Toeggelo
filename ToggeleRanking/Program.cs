using Microsoft.EntityFrameworkCore;
using ToggeleRanking;
using ToggeleRanking.Models;
using ToggleRanking;

var builder = WebApplication.CreateBuilder(args);

// Configure SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=table_soccer.db"));

var app = builder.Build();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();
}

// API Endpoints
app.MapGet("/players", async (ApplicationDbContext db) =>
    Results.Ok(await db.Players.ToListAsync()));

app.MapPost("/players", async (ApplicationDbContext db, Player player) =>
{
    db.Players.Add(player);
    await db.SaveChangesAsync();
    return Results.Created($"/players/{player.Id}", player);
});

app.MapGet("/matches", async (ApplicationDbContext db) =>
    Results.Ok(await db.Matches.ToListAsync()));

app.MapPost("/matches", async (ApplicationDbContext db, Match match) =>
{
    var players = await db.Players
        .Where(p => p.Id == match.Team1.Player1Id || p.Id == match.Team1.Player2Id ||
                    p.Id == match.Team2.Player1Id || p.Id == match.Team2.Player2Id)
        .ToListAsync();

    if (players.Count != 4) return Results.BadRequest("Invalid players.");

    var team1Players = players.Where(p => p.Id == match.Team1.Player1Id || p.Id == match.Team1.Player2Id).ToList();
    var team2Players = players.Where(p => p.Id == match.Team2.Player1Id || p.Id == match.Team2.Player2Id).ToList();

    var newRatingsTeam1 = EloCalculator.Calculate(
        team1Players.Select(p => p.Rating).ToList(),
        team2Players.Select(p => p.Rating).ToList(),
        match.Team1Score > match.Team2Score ? 1 : 0
    );

    var newRatingsTeam2 = EloCalculator.Calculate(
        team1Players.Select(p => p.Rating).ToList(),
        team2Players.Select(p => p.Rating).ToList(),
        match.Team1Score > match.Team2Score ? 1 : 0
    );

    for (int i = 0; i < 2; i++)
    {
        team1Players[i].Rating = newRatingsTeam1[i];
        team2Players[i].Rating = newRatingsTeam2[i];
    }

    await db.SaveChangesAsync();

    db.Matches.Add(match);
    await db.SaveChangesAsync();

    return Results.Ok();
});

app.Run();
