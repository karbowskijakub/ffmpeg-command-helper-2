using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ffmpeg_conversion_helper.Domain.Models
{
    public class CommandPost
    {
      public Guid Id { get; set; }
      public string UserId { get; set; }
      public string PostName { get; set; }
      public string PostContent { get; set; }
    }
}
