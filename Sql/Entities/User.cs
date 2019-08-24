using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("users")]
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Role { get; set; }
        public string Password { get; set; }
        public List<Equity> equities;
        public List<Liability> liabilities;
    }

    
}