using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public enum UserRole
    {
        Administrator,
        Manager,
        User
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; } = true;
        public string FullName { get; set; }

        public static User FromDbEntity(SqlEntity.User sqlUser)
        {
            if (sqlUser == null) return null;
            
            return new User
            {
                Id = sqlUser.Id,
                Username = sqlUser.Username,
                Role = (UserRole) sqlUser.Role,
                FullName = sqlUser.FullName,
                IsActive = sqlUser.IsActive == 1
            };
        }
    }
}