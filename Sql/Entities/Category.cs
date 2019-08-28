using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("categories")]
    public class Category
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}