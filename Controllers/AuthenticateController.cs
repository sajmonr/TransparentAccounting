using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Sql.Entities;
using TransparentAccounting.Utilities.Cryptography;

namespace TransparentAccounting.Controllers
{
    public class AuthenticateController : BaseController
    {
        [HttpPost]
        public Models.User LogIn(string username, string password)
        {
            var users = GetDbContext().Select<User>();

            var dbUser = users.FirstOrDefault(u => u.Username == username && u.Password == Hash.Sha256(password) && u.IsActive == 1 && u.IsDeleted == 0);

            return Models.User.FromDbEntity(dbUser);
        }
    }
}