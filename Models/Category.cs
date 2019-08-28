using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public static Category FromDbEntity(SqlEntity.Category sqlCategory)
        {
            if (sqlCategory == null) return null;

            return new Category
            {
                Id = sqlCategory.Id,
                Name = sqlCategory.Name
            };
        }
        
    }
}