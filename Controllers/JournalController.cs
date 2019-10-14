using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update;
using Newtonsoft.Json.Linq;
using TransparentAccounting.Models;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class JournalController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public JournalController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
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

            if (transaction.Attachments != null)
            {
                var sqlAttachments = transaction.Attachments.Select(a => new SqlEntities.Attachment
                {
                    TransactionId = transactionId,
                    Name = a.Name,
                    Path = a.Path
                });
                
                foreach (var attachment in sqlAttachments)
                    dbContext.Insert(attachment);
            }

            
            
            var sqlEntries = transaction.Entries.Select(entry => new SqlEntities.JournalEntry
            {
                Amount = entry.Amount,
                TransactionId = transactionId,
                Side = (int)entry.Side,
                AccountId = entry.Account.Id
            });

            foreach (var entry in sqlEntries)
                dbContext.Insert(entry);

        }

        [HttpPost]
        public void ApproveTransaction([FromBody]JournalTransaction transaction)
        {
            var dbContext = GetDbContext();
            var sqlTransaction = dbContext.Select<SqlEntities.JournalTransaction>().FirstOrDefault(t => t.Id == transaction.Id);

            //Terminate if transaction ID does not exist
            if (sqlTransaction == null) return;

            var entries = dbContext.Select<SqlEntities.JournalEntry>().Where(e => e.TransactionId == transaction.Id);
            
            PostTransactions(entries);

            sqlTransaction.Description = transaction.Description;
            sqlTransaction.Status = (int)TransactionStatusType.Approved;
            sqlTransaction.ResolveDate = DateTime.Now;
            sqlTransaction.ResolvedBy = transaction.ResolvedBy.Id;
            
            dbContext.Update(sqlTransaction);
        }

        [HttpPost]
        public void RejectTransaction([FromBody]JournalTransaction transaction)
        {
            var sqlTransaction = GetDbContext().Select<SqlEntities.JournalTransaction>()
                .FirstOrDefault(t => t.Id == transaction.Id);
            if (sqlTransaction == null) return;

            sqlTransaction.Status = (int)TransactionStatusType.Rejected;
            sqlTransaction.ResolveDate = DateTime.Now;
            sqlTransaction.ResolvedBy = transaction.ResolvedBy.Id;
            sqlTransaction.Description = transaction.Description;

            GetDbContext().Update(sqlTransaction);
        }

        private void PostTransactions(IEnumerable<SqlEntities.JournalEntry> entries)
        {
            var dbContext = GetDbContext();
            var accounts = dbContext.Select<SqlEntities.Account>().ToArray();
            
            foreach (var entry in entries.ToArray())
            {
                if (entry.Amount <= 0) break;

                var account = accounts.First(a => a.Id == entry.AccountId);

                if (account.NormalSide == entry.Side)
                {
                    account.Balance += entry.Amount;
                }
                else 
                {
                    account.Balance -= entry.Amount;
                }

                dbContext.Update(account);
            }
        }

        private decimal postDebitBalance(SqlEntities.Account account, SqlEntities.JournalEntry entry)
        {
            if (NormalSide.Left.Equals(account.NormalSide))
            {
                account.Debit += entry.Amount;
            }
            else
            {
                account.Debit -= entry.Amount;
            }
            return account.Debit;
        }

        private decimal postCreditBalance(SqlEntities.Account account, SqlEntities.JournalEntry entry)
        {
            if (NormalSide.Right.Equals(account.NormalSide))
            {
                account.Credit += entry.Amount;
            }
            else
            {
                account.Credit -= entry.Amount;
            }
            return account.Credit;
        }

        private void SaveFiles()
        {
            
        }
        
    }
}