using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/users", async (AppDbContext db) => await db.Users.ToListAsync());
app.MapGet("/demandes", async (AppDbContext db) => await db.Demandes.ToListAsync());
app.MapGet("/notifications", async (AppDbContext db) => await db.Notifications.ToListAsync());

app.Run();

