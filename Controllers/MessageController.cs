using System;
using System.Linq;
using TransparentAccounting.Sql.Entities;
using TransparentAccounting.Sql.Attributes;
using SqlEntity = TransparentAccounting.Sql.Entities;



namespace TransparentAccounting.Controllers
{
    public class MessageController : BaseController
    {
        public Message MessageCode(int code) 
        {
            var primaryKeyProperty = typeof(Message).GetProperties()
                        .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));
            var messages = GetDbContext().SelectWhere<Message>(primaryKeyProperty.Name, code);
            return messages.First(message => message.Id == code);
        }
        
    }
}