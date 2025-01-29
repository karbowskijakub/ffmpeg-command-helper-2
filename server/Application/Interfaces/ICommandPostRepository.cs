using ffmpeg_commander.Application.DTO;
using ffmpeg_conversion_helper.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ffmpeg_conversion_helper.Application.Interfaces
{
    public interface ICommandPostRepository
    {
        Task<CommandPost> CreateAsync(CommandPostDtoCreate commandPostDtoCreate, string userId);
        Task<CommandPost> GetByIdAsync(Guid id);
        Task<IEnumerable<CommandPost>> GetAllAsync();
        Task<CommandPost> UpdateAsync(CommandPost commandPost);
        Task<bool> DeleteAsync(Guid id, string UserId);
        Task<IEnumerable<CommandPost>> GetAllByUserIdAsync(string userId);
        Task<User?> GetCurrentUser(string userId);
    }
}
