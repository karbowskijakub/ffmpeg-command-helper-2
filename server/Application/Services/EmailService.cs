using ffmpeg_conversion_helper.Application.Interfaces;
using ffmpeg_conversion_helper.Application.ServicesData;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ffmpeg_conversion_helper.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfiguration;
        public EmailService(IOptions<EmailConfiguration> options)
        {
            this._emailConfiguration = options.Value;
        }

        public async Task SendEmail(EmailRequest request)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailConfiguration.Email);
            email.To.Add(MailboxAddress.Parse(request.ToEmail));
            email.Subject = request.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = request.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_emailConfiguration.Host, _emailConfiguration.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailConfiguration.Email, _emailConfiguration.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
