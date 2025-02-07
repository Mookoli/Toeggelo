using Microsoft.EntityFrameworkCore;
using ToggeleRanking.Models;

namespace ToggeleRanking.Endpoints
{
    public static class PlayerEndpoints
    {
        public static void MapPlayerEndpoints(this WebApplication app)
        {
            app.MapGet("/players", async (ApplicationDbContext db) =>
            {
                return Results.Ok(await db.Players.ToListAsync());
            });

            app.MapPost("/players", async (ApplicationDbContext db, Player player) =>
            {
                db.Players.Add(player);
                await db.SaveChangesAsync();
                return Results.Created($"/players/{player.Id}", player);
            });
        }
    }
}