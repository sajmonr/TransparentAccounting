using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Models;
using TransparentAccounting.Services;

namespace TransparentAccounting.Controllers
{
    public class EmailController : BaseController
    {
        private readonly EmailService _email;
        public EmailController(EmailService emailService)
        {
            _email = emailService;
        }
        [HttpPost]
        public void Send([FromBody] EmailMessage email)
        {
            _email.Send(email);
        }
    }
}