using TransparentAccounting.Sql.Attributes;
    
namespace TransparentAccounting.Sql.Entities
{
    [Table("passwordhistory")]
    public class PasswordHistory
    {
        [PrimaryKey]
        public int Id { get; set; }

        public int UserId { get; set; }
        public string Password { get; set; }
    }
}