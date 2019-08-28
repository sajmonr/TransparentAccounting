using System.Collections.Generic;
using System.Linq;
using TransparentAccounting.Models;
using SqlEntity = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Controllers
{
    public class AccountsController : BaseController
    {
        public IEnumerable<Category> GetCategories()
        {
            var categories = GetDbContext().Select<SqlEntity.Category>();

            return categories.Select(Category.FromDbEntity).ToList();
        }

        public IEnumerable<Subcategory> GetSubcategories()
        {
            var subcategories = GetDbContext().Select<SqlEntity.Subcategory>();
            return subcategories.Select(Subcategory.FromDbEntity);
        }

        public IEnumerable<Account> GetAccounts()
        {
            var accounts = GetDbContext().Select<SqlEntity.Account>();
            var categories = GetDbContext().Select<SqlEntity.Category>();
            var subcategories = GetDbContext().Select<SqlEntity.Subcategory>();

            return accounts.Select(account => Account.FromDbEntity(
                account,
                categories.First(c => c.Id == account.CategoryId),
                subcategories.First(s => s.Id == account.SubcategoryId)
            ));
        }
    }
}