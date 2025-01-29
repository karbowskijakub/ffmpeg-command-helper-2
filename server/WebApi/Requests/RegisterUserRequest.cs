﻿namespace ffmpeg_conversion_helper.WebApi.Requests
{
    public class RegisterUserRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required bool Terms { get; set; }
    }
}
