using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{
    [Table("securityquestions")]
    public class SecurityQuestion
    {
        [PrimaryKey] 
        public int Id { get; set; }

        public string Question { get; set; }
    }
}