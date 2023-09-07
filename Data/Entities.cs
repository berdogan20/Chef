using System;
using Chef.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chef.Data
{
	public class Entities: DbContext
	{
        public DbSet<User> Users => Set<User>();

        public DbSet<Category> Categories => Set<Category>();

        public DbSet<Food> Foods => Set<Food>(); // ?

        public DbSet<Order> Orders => Set<Order>();

        public Entities(DbContextOptions<Entities> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // set user's email as id
            modelBuilder.Entity<User>().HasKey(p => p.Email);

            base.OnModelCreating(modelBuilder);
        }

    }
}

