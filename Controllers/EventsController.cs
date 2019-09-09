using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var securityQuestions = GetDbContext().Select<SqlEntities.SecurityQuestion>();

            var events = new List<Event>();
            
            foreach(var e in sqlEvents)
            {
                var user = sqlUsers.First(u => u.Id == e.UserId);
                var securityQuestion = securityQuestions.First(q => q.Id == user.SecurityQuestion);
                
                events.Add(Event.FromDbEntity(e, Models.User.FromDbEntity(user, securityQuestion)));
            }

            return events.ToArray();
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