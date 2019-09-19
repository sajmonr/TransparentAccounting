using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("journalentrytypes")]
    public class JournalEntryType
    {
        [PrimaryKey] 
        public int Id { get; set; }
        public string Name { get; set; }
    }
}