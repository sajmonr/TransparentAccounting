using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class AuthenticateController : BaseController
    {
        [HttpPost]
        public User LogIn(string username, string password)
        {
            var users = GetDbContext().Select<User>();

            return users.FirstOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}