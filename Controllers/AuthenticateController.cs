using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Models;
using TransparentAccounting.Utilities.Cryptography;
using TransparentAccounting.Utilities;
using User = TransparentAccounting.Sql.Entities.User;
using Entities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class AuthenticateController : BaseController
    {
        [HttpPost]
        public Login LogIn(string username, string password)
        {
            var users = GetDbContext().Select<User>();
            var dbUser = users.First(u => u.Username == username && u.IsDeleted == 0);

            if (dbUser == null)
                return new Login {Result = LoginResult.NotFound};

            if (dbUser.PasswordExpiration < DateTime.Now)
                return new Login {Result = LoginResult.PasswordExpired};
            
            if (dbUser.IsActive == 0 ||
                (dbUser.SuspendFrom.HasValue && dbUser.SuspendTo.HasValue && dbUser.SuspendFrom.Value < DateTime.Now &&
                 dbUser.SuspendTo.Value > DateTime.Now))
                return new Login {Result = LoginResult.UserSuspended};

            //Check if the password is correct
            if (dbUser.Password.Equals(Hash.Sha256(password)))
            {
                //If it is and password tries are not 0 then reset it and save back to DB
                if (dbUser.PasswordTries != 0)
                {
                    dbUser.PasswordTries = 0;
                    GetDbContext().Update(dbUser);
                }
                //return successful login
                return new Login
                {
                    Result = LoginResult.Success,
                    User = Models.User.FromDbEntity(dbUser)
                };                
            }
            
            //Increment password counts
            dbUser.PasswordTries++;

            //Inactivate user if he/she exceeded password limit
            if (dbUser.PasswordTries > Constants.MAXIMUM_PASSWORD_ATTEMPTS)
                dbUser.IsActive = 0;
            
            GetDbContext().Update(dbUser);
            return new Login {Result = dbUser.PasswordTries > Constants.MAXIMUM_PASSWORD_ATTEMPTS ? LoginResult.LockedOut : LoginResult.InvalidPassword};
        }

        public SecurityQuestion[] SecurityQuestions()
        {
            var securityQuestions = GetDbContext().Select<Entities.SecurityQuestion>();

            return securityQuestions.Select(SecurityQuestion.FromDbEntity).ToArray();
        }
        
    }
}