using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("subcategories")]
    public class Subcategory
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }
}