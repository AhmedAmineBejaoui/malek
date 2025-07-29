using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Demande> Demandes => Set<Demande>();
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Username).HasColumnName("username");
            entity.Property(e => e.Userfirstname).HasColumnName("userfirstname");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Mobile).HasColumnName("mobile");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Role).HasColumnName("role");
        });
        modelBuilder.Entity<Demande>(entity =>
        {
            entity.ToTable("demandes");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RequestType).HasColumnName("request_type");
            entity.Property(e => e.RequestSubType).HasColumnName("request_sub_type");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.HasOne(d => d.User)
                .WithMany(u => u.Demandes)
                .HasForeignKey(d => d.UserId);
        });
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.ToTable("notifications");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Message).HasColumnName("message");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date");
            entity.Property(e => e.IsRead).HasColumnName("is_read");
            entity.HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId);
            entity.HasOne(n => n.Demande)
                .WithMany(d => d.Notifications)
                .HasForeignKey(n => n.DemandeId);
        });
    }
}
