using ffmpeg_conversion_helper.Application.Interfaces;
using ffmpeg_conversion_helper.Application.DTO;
using ffmpeg_conversion_helper.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ffmpeg_conversion_helper.Application.Repository
{
    public class UserDataRepository : IUserDataRepository
    {
        private readonly IAppDbContext _dataContext;
        private readonly UserManager<User> _userManager;

        public UserDataRepository(IAppDbContext dataContext, UserManager<User> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public async Task<bool> UpdateUserCredentials(string userId, string firstName, string lastName, bool terms)
        {
            try
            {
                var user = await GetUserById(userId);

                if (user == null)
                {
                    throw new KeyNotFoundException("UpdateUserDataAsync: User not found.");
                }

                user.FirstName = firstName;
                user.LastName = lastName;
                user.Terms = terms;

                _dataContext.Users.Update(user);
                await _dataContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("UpdateUserAsync: An issue occurred:", ex);
            }
        }

        public async Task<UserDto> GetCurrentUser(string userId)
        {
            var user = await GetUserById(userId);

            if (user == null)
            {
                throw new KeyNotFoundException("GetCurrentUserAsync: User not found.");
            }

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                PasswordHash = user.PasswordHash,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }

        public async Task<bool> DeleteUserByEmail(string email)
        {
            try
            {
                var user = await _dataContext.Users
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return false;
                }

                _dataContext.Users.Remove(user);
                await _dataContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("", ex);
            }
        }

        private async Task<User> GetUserById(string userId)
        {
            return await _dataContext.Users
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
