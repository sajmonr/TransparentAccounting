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
        public decimal Amount { get; set; }
        public int TransactionId { get; set; }
        public NormalSide Side { get; set; }
        public Account Account { get; set; }

        public static JournalEntry FromDbEntity(SqlEntities.JournalEntry sqlEntry)
        {
            var db = new ApplicationDomainContext();

            var account = Account.FromDbEntity(db.Select<SqlEntities.Account>().First(a => a.Id == sqlEntry.AccountId));
            
            return new JournalEntry
            {
                Id = sqlEntry.Id,
                Amount =  sqlEntry.Amount,
                TransactionId = sqlEntry.TransactionId,
                Side = (NormalSide)sqlEntry.Side,
                Account = account
            };
        }
        
    }
}