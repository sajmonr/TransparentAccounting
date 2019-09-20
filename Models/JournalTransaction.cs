using System;
using System.Collections.Generic;
using System.Linq;
using TransparentAccounting.Sql;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class JournalTransaction
    {
        public int Id { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreateDate { get; set; }
        public string Description { get; set; }
        public User ApprovedBy { get; set; }
        public DateTime? ApproveDate { get; set; }
        public Journal Journal { get; set; }
        public JournalEntryType Type { get; set; }
        public List<JournalEntry> Entries { get; set; }

        public static JournalTransaction FromDbEntity(SqlEntities.JournalTransaction sqlTransaction)
        {
            var db = new ApplicationDomainContext();

            var users = db.Select<SqlEntities.User>();

            var journal =
                Journal.FromDbEntity(db.Select<SqlEntities.Journal>().First(j => j.Id == sqlTransaction.JournalId));
            var journalEntryType =
                JournalEntryType.FromDbEntity(db.Select<SqlEntities.JournalEntryType>()
                    .First(t => t.Id == sqlTransaction.Type));
            var createdBy = User.FromDbEntity(users.First(u => u.Id == sqlTransaction.CreatedBy));
            var approvedBy = sqlTransaction.ApprovedBy.HasValue ? 
                User.FromDbEntity(users.FirstOrDefault(u => u.Id == sqlTransaction.ApprovedBy.Value)) : null;

            var entries = new List<JournalEntry>();
            
            foreach (var e in db.Select<SqlEntities.JournalEntry>().Where(e => e.TransactionId == sqlTransaction.Id))
            {
                entries.Add(JournalEntry.FromDbEntity(e));
            }
            
            return new JournalTransaction
            {
                Id = sqlTransaction.Id,
                CreateDate = sqlTransaction.CreateDate,
                Description = sqlTransaction.Description,
                ApproveDate = sqlTransaction.ApproveDate,
                Journal = journal,
                Type = journalEntryType,
                ApprovedBy = approvedBy,
                CreatedBy = createdBy,
                Entries = entries
            };
        }
        
    }
}