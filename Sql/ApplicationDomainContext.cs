using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Scaffolding.Internal;
using MySql.Data.MySqlClient;
using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql
{
    public class ApplicationDomainContext
    {
        private readonly string _connectionString;

        public ApplicationDomainContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConnection() => new MySqlConnection(_connectionString);

        public IEnumerable<T> Select<T>() where T : new()
        {
            var output = new List<T>();
            var properties = typeof(T).GetProperties();
            var tableName = (typeof(T).GetCustomAttributes(typeof(TableAttribute), false).Single() as TableAttribute)
                .Name;
            using (var connection = GetConnection())
            {
                var command = new MySqlCommand($"select * from {tableName}", connection);
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var newT = new T();
                        foreach (var property in properties)
                            property.SetValue(newT, reader[ToCamelCase(property.Name)]);
                        
                        output.Add(newT);
                    }
                }
            }

            return output;
        }

        private string ToCamelCase(string value) => Char.ToLowerInvariant(value[0]) + value.Substring(1);

    }
}