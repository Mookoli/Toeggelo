using Microsoft.EntityFrameworkCore;
using ToggeleRanking.Models;

namespace ToggeleRanking
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected ApplicationDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>().HasKey(p => p.Id);
            modelBuilder.Entity<Match>().HasKey(m => m.Id);
            modelBuilder.Entity<Match>().OwnsOne(m => m.Team1);
            modelBuilder.Entity<Match>().OwnsOne(m => m.Team2);
        }
    }
}