using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TransparentAccounting.Models;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class JournalController : BaseController
    {
        public IEnumerable<JournalEntry> GetEntries()
        {
            var entries = GetDbContext().Select<SqlEntities.JournalEntry>();

            return entries.Select(JournalEntry.FromDbEntity);
        }
    }
}