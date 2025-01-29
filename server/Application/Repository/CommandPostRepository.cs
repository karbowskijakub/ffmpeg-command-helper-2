using ffmpeg_commander.Application.DTO;
using ffmpeg_conversion_helper.Application.Interfaces;
using ffmpeg_conversion_helper.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ffmpeg_conversion_helper.Infrastructure.Repositories
{
    public class CommandPostRepository : ICommandPostRepository
    {
        private readonly IAppDbContext _context;

        public CommandPostRepository(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<CommandPost> CreateAsync(CommandPostDtoCreate commandPostDtoCreate, string userId)
        {
            var commandPost = new CommandPost
            {
                Id = Guid.NewGuid(),       
                UserId = userId,                
                PostName = commandPostDtoCreate.PostName,    
                PostContent = commandPostDtoCreate.PostContent 
            };


            _context.CommandPosts.Add(commandPost);

            await _context.SaveChangesAsync();

            return commandPost;
        }

        public async Task<CommandPost> GetByIdAsync(Guid id)
        {
            return await _context.CommandPosts.FindAsync(id);
        }

        public async Task<IEnumerable<CommandPost>> GetAllAsync()
        {
            return await _context.CommandPosts.ToListAsync();
        }

        public async Task<CommandPost> UpdateAsync(CommandPost commandPost)
        {
            _context.CommandPosts.Update(commandPost);
            await _context.SaveChangesAsync();
            return commandPost;
        }

        public async Task<IEnumerable<CommandPost>> GetAllByUserIdAsync(string userId)
        {
            return await _context.CommandPosts
                .Where(commandPost => commandPost.UserId == userId) 
                .ToListAsync();
        }

        public async Task<User?> GetCurrentUser(string userId)
        {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<bool> DeleteAsync(Guid id, string userId)
        {

            var commandPost = await _context.CommandPosts
                .FirstOrDefaultAsync(cp => cp.Id == id && cp.UserId == userId);
            if (commandPost == null)
                return false;

            _context.CommandPosts.Remove(commandPost);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}