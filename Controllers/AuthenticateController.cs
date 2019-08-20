using Microsoft.AspNetCore.Mvc;
using  TransparentAccounting.Models;

namespace TransparentAccounting.Controllers
{
    public class AuthenticateController : BaseController
    {
        [HttpPost]
        public User Login()
        {
            var x = GetDbContext().Select<User>();
            return null;
        }
    }
}