using System;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class PasswordHistory
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Password { get; set; }
        public DateTime Added { get; set; }

        public static PasswordHistory FromDbEntity(SqlEntities.PasswordHistory passwordHistory, SqlEntities.User user, SqlEntities.SecurityQuestion securityQuestion)
        {
            if (passwordHistory == null)
                return null;

            return FromDbEntity(passwordHistory, User.FromDbEntity(user));
        }
        public static PasswordHistory FromDbEntity(SqlEntities.PasswordHistory passwordHistory, User user)
        {
            return new PasswordHistory
            {
                Id = passwordHistory.Id,
                User = user,
                Password = passwordHistory.Password,
                Added = passwordHistory.Added
            };
        }
    }
}