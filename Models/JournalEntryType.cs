using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class JournalEntryType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static JournalEntryType FromDbEntity(SqlEntities.JournalEntryType type)
        {
            return new JournalEntryType
            {
                Id = type.Id,
                Name = type.Name
            };
        }
        
    }
}