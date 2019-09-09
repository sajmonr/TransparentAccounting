using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NETCore.MailKit.Core;
using TransparentAccounting.Models;
using TransparentAccounting.Utilities.Cryptography;
using Entities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class UsersController : BaseController
    {
        private IEmailService _emailService;
        private readonly string _adminEmail;
        public UsersController(IEmailService emailService, IConfiguration configuration)
        {
            _emailService = emailService;
            _adminEmail = configuration.GetSection("Email")["SenderEmail"];
        }
        public User GetUserById(int id)
        {
            var users = GetDbContext().Select<Entities.User>();
            var dbUser = users.FirstOrDefault(u => u.Id == id);
            var securityQuestion = GetDbContext().Select<Entities.SecurityQuestion>()
                .First(q => q.Id == dbUser.SecurityQuestion);

            return Models.User.FromDbEntity(dbUser, securityQuestion);
        }
        public User[] GetAllUsers()
        {
            var users = GetDbContext().Select<Entities.User>().Where(u => u.IsDeleted != 1).ToArray();
            var securityQuestions = GetDbContext().Select<Entities.SecurityQuestion>();
            var output = new User[users.Count()];

            for (int i = 0; i < output.Length; i++)
                output[i] = Models.User.FromDbEntity(users[i], securityQuestions.First(q => q.Id == users[i].SecurityQuestion));

            return output;
        }
        public void DeleteUserById(int userId)
        {
            var user = new Entities.User
            {
                Id = userId,
                IsDeleted = 1
            };
            GetDbContext().Update(user, "isDeleted");
        }
        public void DisableUserById(int userId)
        {
            var user = new Entities.User
            {
                Id = userId,
                IsActive = 0
            };
            GetDbContext().Update(user, "isActive");
        }

        [HttpPost]
        public void Disable([FromBody] User user)
        {
            var sqlUser = GetDbContext().Select<Entities.User>().First(u => u.Id == user.Id);

            sqlUser.IsActive = BoolToInt(user.IsActive);
            sqlUser.SuspendFrom = user.SuspendFrom;
            //TODO: This must be reworked to end at midnight that day
            sqlUser.SuspendTo = user.SuspendTo;

            GetDbContext().Update(sqlUser);
        }
        public void EnableUserById(int userId)
        {
            var user = new Entities.User
            {
                Id = userId,
                IsActive = 1
            };
            GetDbContext().Update(user, "isActive");
        }

        public void ResolveSelfRegistration(int userId, bool approve)
        {
            var dbUser = GetDbContext().Select<Entities.User>().First(u => u.Id == userId);
            string subject = $"Your application has been {(approve ? "approved" : "denied")}.";
            string message;

            if (approve)
            {
                dbUser.IsActive = 1;
                message = "Your application has been approved. Click <a href=\"http://localhost:5001\">here</a> to log in.";
            }
            else
            {
                dbUser.IsDeleted = 1;
                message = "Your application has been denied. Sorry :(.";
            }
            
            GetDbContext().Update(dbUser);
            _emailService.Send(dbUser.Email, subject, message, true);
        }
        [HttpPost]
        public UserUpdateResult SelfRegister([FromBody] User user)
        {
            string username = GenerateUserName(user.FullName, DateTime.Now);
            var dbUser = GetDbContext().Select<Entities.User>().FirstOrDefault(u => u.Username == username);

            if (dbUser != null)
                return UserUpdateResult.UsernameTaken;

            dbUser = new Entities.User
            {
                Role = (int)UserRole.Accountant,
                FullName = user.FullName,
                IsActive = 0,
                Email = user.Email,
                Username = username,
                PasswordExpiration = DateTime.Now.AddMonths(1),
                Password = Hash.Sha256(user.Password),
                Address = user.Address
            };
            
            GetDbContext().Insert(dbUser);

            var createdUser = GetDbContext().Select<Entities.User>().First(u => u.Username == dbUser.Username);
            
            var emailMessage = $"New user has registered. You can <a href=\"http://localhost:5001/account/resolve?userId={createdUser.Id}&approve=1\">approve</a> or <a href=\"http://localhost:5001/account/resolve?userId={createdUser.Id}&approve=0\">deny</a> the registration.";
            
            _emailService.Send(_adminEmail, "New user registration", emailMessage, true);
            
            return UserUpdateResult.Ok;
        }

        [HttpPost]
        public UserUpdateResult ForgotPassword([FromBody] User user)
        {
            var sqlUser = GetDbContext().Select<Entities.User>().FirstOrDefault(u => u.Username.Equals(user.Username) && u.Email.Equals(user.Email));

            if (sqlUser == null)
                return UserUpdateResult.UserNotFound;

            if (sqlUser.SecurityQuestion != user.SecurityQuestion.Id ||
                !sqlUser.SecurityAnswer.Equals(user.SecurityQuestion.Answer))
                return UserUpdateResult.WrongSecurityAnswer;

            user.Id = sqlUser.Id;
            user.FullName = sqlUser.FullName;
            
            return InsertUser(user);
        }
        [HttpPost]
        public UserUpdateResult InsertUser([FromBody]User user)
        {
            bool passwordUpdated = false;
            var sqlUsers = GetDbContext().Select<Entities.User>();
            var sqlUser = sqlUsers.FirstOrDefault(u => u.Id == user.Id) ?? new Entities.User();
            //Just create the user here - not optimal, but fast.
            sqlUser.Role = (int)user.Role;
            sqlUser.FullName = user.FullName;
            sqlUser.IsActive = BoolToInt(user.IsActive);
            sqlUser.Email = user.Email;
            
            //Allow this to be overriden when the username fields is empty
            sqlUser.Username = string.IsNullOrWhiteSpace(user.Username)
                ? GenerateUserName(user.FullName.Split(' ')[0], user.FullName.Split(' ')[1], DateTime.Now)
                : user.Username;
            
            //Check if the username is unique
            if (sqlUser.Id == 0 && sqlUsers.Any(u => u.Username == sqlUser.Username))
                return UserUpdateResult.UsernameTaken;
            
            //Only update the password if it was received
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                string hash = Hash.Sha256(user.Password);
                //Check if user used password in the past only if the user is new
                if (sqlUser.Id > 0 && GetDbContext().Select<Entities.PasswordHistory>().Where(p => p.UserId == sqlUser.Id)
                    .Any(p => p.Password == hash))
                    return UserUpdateResult.PasswordUsedInPast;
                
                //Set the password updated flag
                passwordUpdated = true;
                
                sqlUser.Password = hash;
                sqlUser.PasswordTries = 0;
                sqlUser.PasswordExpiration = DateTime.Now.AddMonths(1);
            }
                
            if(sqlUser.Id > 0)
                GetDbContext().Update(sqlUser);
            else
                GetDbContext().Insert(sqlUser);

            //Update password history table if password was updated
            //If the user was created then we need to select it again - this time by username.
            if (passwordUpdated)
            {
                var updatedUser = sqlUser.Id > 0 ? sqlUser : GetDbContext().Select<Entities.User>().First(u => u.Username == sqlUser.Username);
                GetDbContext().Insert(new Entities.PasswordHistory
                {
                    UserId = updatedUser.Id,
                    Password = updatedUser.Password
                });
            }
            
            return UserUpdateResult.Ok;
        }

        public IEnumerable<PasswordHistory> PasswordHistory(int userId)
        {
            var dbUser = GetDbContext().Select<Entities.User>().FirstOrDefault(u => u.Id == userId);
            var securityQuestion = GetDbContext().Select<Entities.SecurityQuestion>()
                .First(q => q.Id == dbUser.SecurityQuestion);
            var user = Models.User.FromDbEntity(dbUser, securityQuestion);
            if(user == null)
                return new PasswordHistory[0];

            var passwordHistory = GetDbContext().Select<Entities.PasswordHistory>().Where(p => p.UserId == user.Id);

            return passwordHistory.Select(h => Models.PasswordHistory.FromDbEntity(h, user));
        }

        private string GenerateUserName(string fullName, DateTime dateCreated) =>
            GenerateUserName(fullName.Split(' ')[0], fullName.Split(' ')[1], dateCreated);
        private string GenerateUserName(string firstName, string lastName, DateTime dateCreated)
        {
            //Username should be first name initial followed by last name and date of creation e.g. jdoe0919
            StringBuilder sb = new StringBuilder();

            sb.Append(firstName.Substring(0, 1).ToLower());
            sb.Append(lastName.ToLower());
            sb.Append(dateCreated.ToString("MMy"));
            
            return sb.ToString();
        }

        private int BoolToInt(bool value) => value ? 1 : 0;

    }
}