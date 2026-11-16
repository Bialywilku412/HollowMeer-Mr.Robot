using Hollowmeer.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hollowmeer.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Beast>().Navigation(b => b.Region).AutoInclude();
    }

    public DbSet<Beast> Beasts => Set<Beast>();
    public DbSet<Region> Regions => Set<Region>();
    public DbSet<Quest> Quests => Set<Quest>();
}