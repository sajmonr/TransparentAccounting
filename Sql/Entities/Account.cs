using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("accounts")]
    public class Account
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
        public int NormalSide { get; set; }
        public decimal BeginningBalance { get; set; }
        public decimal Balance { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public int Order { get; set; }
        public int StatementId { get; set; }
        public int Active { get; set; }
    }
}