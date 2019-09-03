using System;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }
        public Account AccountCredit { get; set; }
        public Account AccountDebit { get; set; }
        public decimal Amount { get; set; }
        public DateTime ApprovedDate { get; set; }
        public User Approver { get; set; }
        public DateTime Created { get; set; }
        public User CreatedBy { get; set; }
        public string Description { get; set; }

        public static JournalEntry FromDbEntity(SqlEntities.JournalEntry sqlEntry, Account debitAccount, Account creditAccount, User approver, User creator)
        {
            return new JournalEntry
            {
                Id = sqlEntry.Id,
                AccountCredit =  creditAccount,
                AccountDebit = debitAccount,
                Amount =  sqlEntry.Amount,
                ApprovedDate = sqlEntry.ApprovedDate,
                Approver = approver,
                Created = sqlEntry.CreateDate,
                CreatedBy = creator,
                Description = sqlEntry.Description
            };
        }
        
    }
}