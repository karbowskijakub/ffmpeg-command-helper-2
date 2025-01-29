using System.Text.Encodings.Web;

namespace ffmpeg_conversion_helper.Infrastructure.Resources
{
    public static class ResetPassword
    {
        public static string GeneratePasswordResetEmail(string firstName, string resetPasswordUrl)
        {
            return $@"
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                            color: #454545;
                        }}
                        h1 {{
                            font-size: 24px;
                            color: #000000;
                        }}
                        p {{
                            font-size: 16px;
                            color: #454545;
                            line-height: 1.6;
                        }}
                        a {{
                            color: #ffffff;
                            background-color: #000000;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            display: inline-block;
                        }}
                        a:hover {{
                            background-color: #454545;
                        }}
                        .footer {{
                            margin-top: 20px;
                            font-size: 14px;
                            color: #454545;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h1>Hello {HtmlEncoder.Default.Encode(firstName)},</h1>
                        <p>We received a request to reset the password for your account. If you made this request, please click the button below to reset your password:</p>
                        <p style='text-align: center;'>
                            <a href='{HtmlEncoder.Default.Encode(resetPasswordUrl)}'>Reset your password</a>
                        </p>
                        <p>If you didn't request a password reset, you can safely ignore this message. Your password will remain unchanged.</p>
                   <div class='footer'>
                            <p>Best regards, Admin of application</p>
                        </div>
                    </div>
                </body>
                </html>";
        }
    }
}
