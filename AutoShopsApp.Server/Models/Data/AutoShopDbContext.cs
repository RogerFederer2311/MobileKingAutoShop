using System.Collections.Generic;
using AutoShopsApp.Server.Models;
using Microsoft.EntityFrameworkCore;

public class AutoShopDbContext : DbContext
{
    public AutoShopDbContext(DbContextOptions<AutoShopDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<ServiceRequest> ServiceRequests { get; set; }
}
