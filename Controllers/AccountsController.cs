using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TransparentAccounting.Models;
using TransparentAccounting.Sql.Attributes;
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

        public Account GetAccountById(int id)
        {
            var accounts = GetAccounts();
            return accounts.FirstOrDefault(account => id == account.Id);
        }
        
        [HttpPost]
        public void CreateAccount([FromBody]Account account)
        {
            var sqlAccount = SqlEntity.Account.ToDbEntity(account);
            GetDbContext().Insert(sqlAccount);
        }

        [HttpPost]
        public void UpdateAccount([FromBody] Account account)
        {
            var sqlAccount = SqlEntity.Account.ToDbEntity(account);
            GetDbContext().Update(sqlAccount);
        }

        [HttpPost]
        public void UpdateAccounts([FromBody]Account[] accounts)
        {
            foreach (var account in accounts)
            {
                UpdateAccount(account);
            }
        }

        public void RemoveAccountById(int id)
        {
            var primaryKeyProperty = typeof(SqlEntity.Account).GetProperties()
                .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));
            GetDbContext().Delete<SqlEntity.Account>(primaryKeyProperty.Name, id);
        }
        
        public void RemoveAccountsByIds(string idJson)
        {
            var ids = JsonConvert.DeserializeObject<int[]>(idJson);
            foreach (var id in ids)
            {
                RemoveAccountById(id);
                Console.WriteLine("Success");
            }
        }
    }
}