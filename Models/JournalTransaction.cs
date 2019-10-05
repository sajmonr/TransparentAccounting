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
        public User ResolvedBy { get; set; }
        public DateTime? ResolveDate { get; set; }
        public Journal Journal { get; set; }
        public TransactionType Type { get; set; }
        public List<JournalEntry> Entries { get; set; }
        public TransactionStatusType Status { get; set; }
        public List<Attachment> Attachments { get; set; }

        public static JournalTransaction FromDbEntity(SqlEntities.JournalTransaction sqlTransaction)
        {
            var db = new ApplicationDomainContext();

            var users = db.Select<SqlEntities.User>().ToArray();
            var attachments = db.Select<SqlEntities.Attachment>().Where(a => a.TransactionId == sqlTransaction.Id);
            var journal =
                Journal.FromDbEntity(db.Select<SqlEntities.Journal>().First(j => j.Id == sqlTransaction.JournalId));
            var createdBy = User.FromDbEntity(users.First(u => u.Id == sqlTransaction.CreatedBy));
            var resolvedBy = sqlTransaction.ResolvedBy.HasValue ? 
                User.FromDbEntity(users.FirstOrDefault(u => u.Id == sqlTransaction.ResolvedBy.Value)) : null;

            var entries = db.Select<SqlEntities.JournalEntry>().Where(e => e.TransactionId == sqlTransaction.Id).Select(JournalEntry.FromDbEntity).ToList();

            return new JournalTransaction
            {
                Id = sqlTransaction.Id,
                CreateDate = sqlTransaction.CreateDate,
                Description = sqlTransaction.Description,
                ResolveDate = sqlTransaction.ResolveDate,
                Journal = journal,
                Type = (TransactionType)sqlTransaction.Type,
                ResolvedBy = resolvedBy,
                CreatedBy = createdBy,
                Entries = entries,
                Status = (TransactionStatusType)sqlTransaction.Status,
                Attachments = attachments.Select(Attachment.FromDbEntity).ToList()
            };
        }
        
    }
}