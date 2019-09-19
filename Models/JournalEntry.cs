using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using TransparentAccounting.Sql;
using TransparentAccounting.Utilities;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }
        public Account AccountCredit { get; set; }
        public Account AccountDebit { get; set; }
        public decimal Amount { get; set; }
        

        public static JournalEntry FromDbEntity(SqlEntities.JournalEntry sqlEntry)
        {
            var db = new ApplicationDomainContext();

            var accounts = db.Select<SqlEntities.Account>();

            var debitAccount = Account.FromDbEntity(accounts.First(a => a.Id == sqlEntry.AccountDebit));
            var creditAccount = Account.FromDbEntity(accounts.First(a => a.Id == sqlEntry.AccountCredit));
            
            return new JournalEntry
            {
                Id = sqlEntry.Id,
                AccountCredit =  creditAccount,
                AccountDebit = debitAccount,
                Amount =  sqlEntry.Amount
            };
        }
        
    }
}