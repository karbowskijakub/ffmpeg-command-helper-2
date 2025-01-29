using Microsoft.AspNetCore.Identity;

namespace ffmpeg_conversion_helper.Domain.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool Terms { get; set; }
    }
}
