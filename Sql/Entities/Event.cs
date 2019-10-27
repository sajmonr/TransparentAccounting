using System;
using TransparentAccounting.Sql.Attributes;
    
namespace TransparentAccounting.Sql.Entities
{
    [Table("events")]
    public class Event
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Timestamp { get; set; }
        public string Description { get; set; }
        public string Original { get; set; }
        public string Updated { get; set; }
        public int EventType { get; set; }
        
    }
}