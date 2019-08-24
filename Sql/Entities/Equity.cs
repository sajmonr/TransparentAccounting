using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
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