using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public enum NormalSide{Left, Right}
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public NormalSide NormalSide { get; set; }
        public decimal BeginningBalance { get; set; }
        public decimal Balance { get; set; }
        public Category Category { get; set; }
        public Subcategory Subcategory { get; set; }
        public int Order { get; set; }
        public bool Active { get; set; }

        public static Account FromDbEntity(SqlEntity.Account account, SqlEntity.Category category, SqlEntity.Subcategory subcategory)
        {
            return new Account
            {
                Id = account.Id,
                Name = account.Name,
                NormalSide = (NormalSide) account.NormalSide,
                BeginningBalance = account.BeginningBalance,
                Balance = account.Balance,
                Order = account.Order,
                Active = account.Active == 1,
                Category = Category.FromDbEntity(category),
                Subcategory = Subcategory.FromDbEntity(subcategory)
            };
        }
        
    }
}