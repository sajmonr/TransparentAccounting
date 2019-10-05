using TransparentAccounting.Sql.Attributes;
    
namespace TransparentAccounting.Sql.Entities
{
    [Table("attachments")]
    public class Attachment
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int TransactionId { get; set; }
    }
}