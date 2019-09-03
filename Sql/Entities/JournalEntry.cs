using System;
using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("journalentries")]
    public class JournalEntry
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int AccountCredit { get; set; }
        public int AccountDebit { get; set; }
        public decimal Amount { get; set; }
        public DateTime ApprovedDate { get; set; }
        public int? ApproverId { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreatedBy { get; set; }
        public string Description { get; set; }
    }
}