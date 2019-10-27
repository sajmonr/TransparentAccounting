using Microsoft.AspNetCore.Mvc;
using NETCore.MailKit.Core;
using  TransparentAccounting.Models;
    
namespace TransparentAccounting.Controllers
{
    public class EmailController : BaseController
    {
        private readonly IEmailService _emailService;
        
        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        [HttpPost]
        public void Send([FromBody] EmailMessage email)
        {
            foreach (string recipient in email.Recipients)
            {
                if(!string.IsNullOrWhiteSpace(recipient))
                    _emailService.Send(recipient, email.Subject, email.Message, email.Html);
            }
                
        }
    }
}