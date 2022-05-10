using Core.Interfaces;
using Core.Mapper.ViewModel;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger<EmailSender> _logger;
        private IConfiguration _configuration;
        private readonly EmailSettings _emailSettings;

        public EmailSender(ILogger<EmailSender> logger, IConfiguration configuration, IOptions<EmailSettings> emailSettings)
        {
            _logger = logger;
            _configuration = configuration;
            _emailSettings = emailSettings.Value;
        }
        
        public async Task SendEmailAsync(string to, string from, string subject, string body)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = body;
            email.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailSettings.Mail, _emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);



            //var apiKey = _configuration["SendGridAPIKey"];
            //var client = new SendGridClient(apiKey);
            //var fromEmail = new EmailAddress("long20002000ht@gmail.com", "JWT Auth Demo");
            ////var fromEmail = new EmailAddress(from);
            //var toEmail = new EmailAddress(to);
            //var msg = MailHelper.CreateSingleEmail(fromEmail, toEmail, subject, body, body);

            //await client.SendEmailAsync(msg);

            //var emailClient = new SmtpClient("localhost");
            //var message = new MailMessage
            //{

            //    From = new MailAddress(from),
            //    Subject = subject,
            //    Body = body


            //};
            //message.To.Add(new MailAddress(to));
            //await emailClient.SendMailAsync(message);
            //_logger.LogWarning($"Sending email to {to} from {from} with subject {subject}.");
        }
    }
}
