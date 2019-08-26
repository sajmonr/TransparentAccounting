using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class UsersController : BaseController
    {
        public Models.User GetUserById(int id)
        {
            var users = GetDbContext().Select<User>();

            var dbUser = users.FirstOrDefault(u => u.Id == id);

            return Models.User.FromDbEntity(dbUser);
        }

        public Models.User[] GetAllUsers()
        {
            var users = GetDbContext().Select<User>().ToArray();
            var output = new Models.User[users.Count()];

            for (int i = 0; i < output.Length; i++)
                output[i] = Models.User.FromDbEntity(users[i]);

            return output;
        }

        public void DeleteUserById(int userId)
        {
            GetDbContext().Delete<User>("id", userId);
        }

        [HttpPost]
        public void InsertUser([FromBody]Models.User user)
        {
            var sqlUser = GetDbContext().Select<User>().FirstOrDefault(u => u.Id == user.Id) ?? new User();
            //Just create the user here - not optimal, but fast.
            //Set the password to 'password' for simplicity.
            sqlUser.Role = (int)user.Role;
            sqlUser.Username = user.Username;
            sqlUser.FullName = user.FullName;
            sqlUser.Password = "password";
            sqlUser.IsActive = user.IsActive ? 1 : 0;
            
            if(sqlUser.Id > 0)
                GetDbContext().Update(sqlUser);
            else
                GetDbContext().Insert(sqlUser);
        }

    }
}