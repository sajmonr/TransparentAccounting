using System;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class Event
    {
        public int Id { get; set; }
        public User CreatedBy { get; set; }
        public DateTime Timestamp { get; set; }
        public string Description { get; set; }

        public static Event FromDbEntity(SqlEntities.Event sqlEvent, User creator)
        {
            return new Event
            {
                Id = sqlEvent.Id,
                CreatedBy = creator,
                Timestamp =  sqlEvent.Timestamp,
                Description = sqlEvent.Description
            };
        }
        
    }
}