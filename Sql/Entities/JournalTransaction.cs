using System;
using TransparentAccounting.Sql.Attributes;
    
namespace TransparentAccounting.Sql.Entities
{
    [Table("journaltransactions")]
    public class JournalTransaction
    {
        [PrimaryKey]
        public int Id { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreateDate { get; set; }
        public string Description { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApproveDate { get; set; }
        public int JournalId { get; set; }
        public int Type { get; set; }
    }
}