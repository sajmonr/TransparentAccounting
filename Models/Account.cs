using System;
using System.Linq;
using TransparentAccounting.Sql;
using TransparentAccounting.Utilities;
using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
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
        public int AccountId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public String Comment { get; set; }
        public bool ContraAccount { get; set; }

        public static Account FromDbEntity(SqlEntity.Account account, SqlEntity.Category category, SqlEntity.Subcategory subcategory)
        {
            return new Account
            {
                Id = account.Id,
                Name = account.Name,
                NormalSide = (NormalSide) account.NormalSide,
                BeginningBalance = account.BeginningBalance,
                Balance = account.Balance,
                Debit = account.Debit,
                Credit = account.Credit,
                Comment = account.Comment,
                Order = account.Order,
                Active = account.Active == 1,
                Category = Category.FromDbEntity(category),
                Subcategory = Subcategory.FromDbEntity(subcategory),
                AccountId = account.AccountId,
                ContraAccount = account.ContraAccount == 1
            };
        }

        public static Account FromDbEntity(SqlEntity.Account account)
        {
            var db = new ApplicationDomainContext();

            var subcategory = db.Select<SqlEntity.Subcategory>().First(s => s.Id == account.SubcategoryId);
            var category = db.Select<SqlEntity.Category>().First(c => c.Id == account.CategoryId);

            return FromDbEntity(account, category, subcategory);
        }
        
    }
}