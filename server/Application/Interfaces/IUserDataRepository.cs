using ffmpeg_conversion_helper.Application.DTO;

namespace ffmpeg_conversion_helper.Application.Interfaces
{
    public interface IUserDataRepository
    {
        Task<UserDto> GetCurrentUser(string userId);
        Task<bool> UpdateUserCredentials(string userId, string firstName, string lastName, bool Terms);
        Task<bool> DeleteUserByEmail(string email);

    }
}
