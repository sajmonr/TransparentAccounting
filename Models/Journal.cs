using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class Journal
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static Journal FromDbIntity(SqlEntities.Journal sqlJournal)
        {
            return new Journal
            {
                Id = sqlJournal.Id,
                Name = sqlJournal.Name
            };
        }
    }
}