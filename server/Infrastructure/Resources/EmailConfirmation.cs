using System.Text.Encodings.Web;


namespace ffmpeg_conversion_helper.Infrastructure.Resources
{
    public static class EmailConfirmation
    {
        public static string GenerateConfirmationEmail(string firstName, string confirmEmailUrl)
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
                        <p>Thank you for creating an account with us! To complete the registration process, please confirm your email address by clicking the link below:</p>
                        <p style='text-align: center;'>
                            <a href='{HtmlEncoder.Default.Encode(confirmEmailUrl)}'>Click here to confirm your email</a>
                        </p>
                        <p>If you didn't sign up for an account, you can safely ignore this email.</p>
                        <div class='footer'>
                            <p>Best regards, Admin of application</p>
                        </div>
                    </div>
                </body>
                </html>";
        }
    }
}
