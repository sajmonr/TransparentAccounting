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
        public int TransactionId { get; set; }
    }
}