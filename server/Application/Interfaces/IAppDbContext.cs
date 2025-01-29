using ffmpeg_conversion_helper.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Threading;
using System.Threading.Tasks;

namespace ffmpeg_conversion_helper.Application.Interfaces
{
    public interface IAppDbContext
    {
        public DbSet<CommandPost> CommandPosts { get; set; }
        DbSet<User> Users { get; }  
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}