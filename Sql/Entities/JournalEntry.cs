using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("journalentries")]
    public class JournalEntry
    {
        [PrimaryKey]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int TransactionId { get; set; }
        public int Debit { get; set; }
        public int AccountId { get; set; }
    }
}