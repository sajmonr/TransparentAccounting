using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("journals")]
    public class Journal
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}