using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public enum UserRole
    {
        Administrator,
        Manager,
        Accountant
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; } = true;
        public string FullName { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; }

        public static User FromDbEntity(SqlEntity.User sqlUser)
        {
            if (sqlUser == null) return null;
            //Do not fill the password
            return new User
            {
                Id = sqlUser.Id,
                Username = sqlUser.Username,
                Role = (UserRole) sqlUser.Role,
                FullName = sqlUser.FullName,
                IsActive = sqlUser.IsActive == 1,
                IsDeleted =  sqlUser.IsDeleted == 1
            };
        }
    }
}