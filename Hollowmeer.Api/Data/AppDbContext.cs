using Hollowmeer.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hollowmeer.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Beast> Beasts => Set<Beast>();
}