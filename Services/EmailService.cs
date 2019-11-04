using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using TransparentAccounting.Models;

namespace TransparentAccounting.Services
{
    public class EmailService
    {
        private readonly string _server;
        private readonly int _port;
        private readonly string _senderName;
        private readonly string _account;
        private readonly string _password;

        private readonly SmtpClient _smtpClient;
        
        public EmailService(IConfiguration configuration)
        {
            var emailConfiguration = configuration.GetSection("Email");
            
            _server = emailConfiguration["Server"];
            _port = int.Parse(emailConfiguration["Port"]);
            _senderName = emailConfiguration["SenderName"];
            _account = emailConfiguration["Account"];
            _password = emailConfiguration["Password"];
            
            _smtpClient = new SmtpClient()
            {
                Host = _server,
                Port = _port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(_account, _password)
            };
        }

        public void Send(EmailMessage message)
        {
            foreach (var recipient in message.Recipients)
            {
                var email = new MailMessage(_account, recipient)
                {
                    Subject = message.Subject,
                    Body = message.Message
                };

                foreach(var attachmentPath in message.Attachments)
                    email.Attachments.Add(new System.Net.Mail.Attachment(attachmentPath));
                
                _smtpClient.Send(email);
            }
        }
        
    }
}