using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class Subcategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public static Subcategory FromDbEntity(SqlEntity.Subcategory sqlSubcategory)
        {
            if (sqlSubcategory == null) return null;

            return new Subcategory
            {
                Id = sqlSubcategory.Id,
                Name = sqlSubcategory.Name
            };
        }
        
    }
}