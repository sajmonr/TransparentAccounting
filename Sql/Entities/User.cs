using TransparentAccounting.Sql.Attributes;
using Models = TransparentAccounting.Models;

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

    }
}