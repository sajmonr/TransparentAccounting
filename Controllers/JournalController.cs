using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TransparentAccounting.Models;
using SqlEntities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class JournalController : BaseController
    {
        public IEnumerable<JournalTransaction> Transactions()
        {
            var transactions = GetDbContext().Select<SqlEntities.JournalTransaction>();

            return transactions.Select(JournalTransaction.FromDbEntity);
        }
        public IEnumerable<JournalEntry> Entries()
        {
            var entries = GetDbContext().Select<SqlEntities.JournalEntry>();

            return entries.Select(JournalEntry.FromDbEntity);
        }
    }
}