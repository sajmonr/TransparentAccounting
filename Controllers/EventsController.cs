using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Models;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class EventsController : BaseController
    {
        public Event[] GetAll()
        {
            var sqlEvents = GetDbContext().Select<SqlEntities.Event>();
            var sqlUsers = GetDbContext().Select<SqlEntities.User>();

            return sqlEvents.Select(e =>
                Event.FromDbEntity(e, Models.User.FromDbEntity(sqlUsers.First(u => u.Id == e.UserId)))).ToArray();
        }

        [HttpPost]
        public void Create([FromBody] Event newEvent)
        {
            var sqlEvent = new SqlEntities.Event
            {
                Description = newEvent.Description,
                //Adjust for timezone here - it's dirty but works for us
                Timestamp = newEvent.Timestamp.AddHours(-4),
                UserId = newEvent.CreatedBy.Id
            };
            GetDbContext().Insert(sqlEvent);
        }
    }
}