using System;
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
        public int AccountId { get; set; }
        
        public decimal Debit { get; set; }
        
        public decimal Credit { get; set; }
        
        public String Comment { get; set; }

        public static Account ToDbEntity(Models.Account account)
        {
            Account sqlAccount = new Account();
            sqlAccount.Id = account.Id;
            sqlAccount.Active = account.Active ? 1 : 0;
            sqlAccount.BeginningBalance = account.BeginningBalance;
            sqlAccount.Balance = account.Balance;
            sqlAccount.Credit = account.Credit;
            sqlAccount.Debit = account.Debit;
            sqlAccount.Comment = account.Comment;
            sqlAccount.CategoryId = account.Category.Id;
            sqlAccount.SubcategoryId = account.Subcategory.Id;
            sqlAccount.Name = account.Name;
            sqlAccount.Order = account.Order;
            sqlAccount.NormalSide = (int) account.NormalSide;
            sqlAccount.StatementId = 0;
            sqlAccount.AccountId = account.AccountId;
            return sqlAccount;
        }
    }
}