using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        public static Attachment FromDbEntity(SqlEntities.Attachment sqlAttachment)
        {
            return new Attachment
            {
                Id = sqlAttachment.Id,
                Name = sqlAttachment.Name,
                Path = sqlAttachment.Path
            };
        }
    }
}