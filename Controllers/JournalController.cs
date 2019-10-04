using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TransparentAccounting.Models;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class JournalController : BaseController
    {
        public IEnumerable<JournalTransaction> Transactions()
        {
            var transactions = GetDbContext().Select<SqlEntities.JournalTransaction>();

            return transactions.Select(JournalTransaction.FromDbEntity);
        }
        public IEnumerable<JournalEntry> Entries()
        {
            var entries = GetDbContext().Select<SqlEntities.JournalEntry>();

            return entries.Select(JournalEntry.FromDbEntity);
        }

        [HttpPost]
        public void AddTransaction([FromBody]JournalTransaction transaction)
        {
            var dbContext = GetDbContext();
            
            var sqlTransaction = new SqlEntities.JournalTransaction
            {
                CreatedBy = transaction.CreatedBy.Id,
                CreateDate = DateTime.Now,
                Description = transaction.Description,
                Type = (int)transaction.Type,
                Status = (int)transaction.Status
            };

            int transactionId = dbContext.Insert(sqlTransaction);

            var sqlEntries = transaction.Entries.Select(entry => new SqlEntities.JournalEntry
            {
                Amount = entry.Amount,
                TransactionId = transactionId,
                Debit = entry.Debit ? 1 : 0,
                AccountId = entry.Account.Id
            });

            foreach (var entry in sqlEntries)
                dbContext.Insert(entry);

        }

        [HttpPost]
        public void ApproveTransaction()
        {
            
        }

        [HttpPost]
        public void RejectTransaction()
        {
            
        }
        
    }
}