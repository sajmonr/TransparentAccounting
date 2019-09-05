using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Sql.Entities;
using TransparentAccounting.Utilities.Cryptography;

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
            var users = GetDbContext().Select<User>().Where(u => u.IsDeleted != 1).ToArray();
            var output = new Models.User[users.Count()];

            for (int i = 0; i < output.Length; i++)
                output[i] = Models.User.FromDbEntity(users[i]);

            return output;
        }

        public void DeleteUserById(int userId)
        {
            var user = new User
            {
                Id = userId,
                IsDeleted = 1
            };
            GetDbContext().Update(user, "isDeleted");
        }
        public void DisableUserById(int userId)
        {
            var user = new User
            {
                Id = userId,
                IsActive = 0
            };
            GetDbContext().Update(user, "isActive");
        }
        public void EnableUserById(int userId)
        {
            var user = new User
            {
                Id = userId,
                IsActive = 1
            };
            GetDbContext().Update(user, "isActive");
        }
        [HttpPost]
        public void InsertUser([FromBody]Models.User user)
        {
            var sqlUser = GetDbContext().Select<User>().FirstOrDefault(u => u.Id == user.Id) ?? new User();
            //Just create the user here - not optimal, but fast.
            sqlUser.Role = (int)user.Role;
            sqlUser.Username = user.Username;
            sqlUser.FullName = user.FullName;
            sqlUser.IsActive = user.IsActive ? 1 : 0;

            //Only update the password if it was received
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                sqlUser.Password = Hash.Sha256(user.Password);
            }

            if(sqlUser.Id > 0)
                GetDbContext().Update(sqlUser);
            else
                GetDbContext().Insert(sqlUser);
        }

    }
}