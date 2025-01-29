using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ffmpeg_conversion_helper.Application.ServicesData;

namespace ffmpeg_conversion_helper.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(EmailRequest request);
    }
}
