using ffmpeg_conversion_helper.Domain.Models;
using ffmpeg_conversion_helper.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ffmpeg_commander.Application.DTO;

namespace ffmpeg_conversion_helper.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CommandPostController : ControllerBase
    {
        private readonly ICommandPostRepository _repository;

        public CommandPostController(ICommandPostRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<CommandPost>> CreateCommandPost([FromBody] CommandPostDtoCreate commandPostDtoCreate)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not found or unauthorized.");
            }

            var createdPost = await _repository.CreateAsync(commandPostDtoCreate, userId);

            return CreatedAtAction(nameof(GetCommandPost), new { id = createdPost.Id }, createdPost);
        }
        [HttpGet("download")]
        public async Task<IActionResult> DownloadAllCommandPostsForUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not found or unauthorized.");
            }

            var commandPosts = await _repository.GetAllByUserIdAsync(userId);

            if (commandPosts == null || !commandPosts.Any())
            {
                return NotFound("No commands found for the user.");
            }

            var fileContent = string.Join(Environment.NewLine,
                                          commandPosts.Select(cp =>
                                              $"{cp.PostName}: {cp.PostContent.Replace("\r\n", " ")
                                                                              .Replace("\n", " ")
                                                                              .Replace("\r", " ")
                                                                              .Replace("\t", " ") 
                                                                              .Replace("  ", " ") 
                                                                              .Trim()}"));        

            return File(new System.Text.UTF8Encoding().GetBytes(fileContent), "text/plain", "commands.txt");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommandPost>>> GetAllCommandPostsForUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not found or unauthorized.");
            }

            var commandPosts = await _repository.GetAllByUserIdAsync(userId);

            return Ok(commandPosts);
        }

        [HttpGet("current-posts-user")]
        public async Task<ActionResult<IEnumerable<User>>> GetCurrentUserPosts()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not found or unauthorized.");
            }

            var UserData = await _repository.GetCurrentUser(userId);

            return Ok(UserData);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommandPost>> GetCommandPost(Guid id)
        {
            var commandPost = await _repository.GetByIdAsync(id);
            if (commandPost == null)
            {
                return NotFound();
            }

            return Ok(commandPost);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommandPost(Guid id, [FromBody] CommandPost commandPost)
        {
            if (id != commandPost.Id)
            {
                return BadRequest();
            }

            await _repository.UpdateAsync(commandPost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommandPost(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await _repository.DeleteAsync(id, userId);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}