using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{

    [Table("liabilities")]
    public class Liability
    {
        public string Name { get; set; }
        public void AddToLiabilities(List<Liability> liabilities)
        {
            liabilities.add(this);
        }
    }

}