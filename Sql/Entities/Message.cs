using TransparentAccounting.Sql.Attributes;


namespace TransparentAccounting.Sql.Entities
{
    [Table("messages")]
    public class Message
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Title { get; set; }
        public string ModalMessage { get; set; }
        public int MessageType { get; set; }
    }
}