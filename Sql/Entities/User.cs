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
    }

    [Table("liabilities")]
    public class Liability
    {
        public string Name { get; set; }
        public void AddToLiabilities(List<Liability> liabilities)
        {
            liabilities.add(this);
        }
    }

    [Table("equity")]
    public class Equity
    {
        public string Name { get; set; }
        public void AddToEquity(List<Equity> equity)
        {
            equity.add(this);
        }
    }
}