using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class PasswordHistory
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Password { get; set; }

        public static PasswordHistory FromDbEntity(SqlEntities.PasswordHistory passwordHistory, SqlEntities.User user)
        {
            return new PasswordHistory
            {
                Id = passwordHistory.Id,
                User = User.FromDbEntity(user),
                Password = passwordHistory.Password
            };
        }
        
    }
}