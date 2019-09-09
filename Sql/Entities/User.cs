using System;
using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("users")]
    public class User
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Username { get; set; }
        public int Role { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public DateTime? SuspendFrom { get; set; }
        public DateTime? SuspendTo { get; set; }
        public string Email { get; set; }
        public int PasswordTries { get; set; }
        public DateTime PasswordExpiration { get; set; }
        public string Address { get; set; }
        public int SecurityQuestion { get; set; }
        public string SecurityAnswer { get; set; }
    }
}