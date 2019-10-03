using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using MySql.Data.MySqlClient;
using TransparentAccounting.Sql.Attributes;
using TransparentAccounting.Utilities;

namespace TransparentAccounting.Sql
{
    public class ApplicationDomainContext
    {
        private readonly string _connectionString;
        private static string INSERT_STRING_FORMATTING = "`{0}`,";
        private static string UPDATE_STRING_FORMATTING = "`{0}`=@{1},";

        public ApplicationDomainContext(): this(Constants.CONECTION_STRING){}
        
        public ApplicationDomainContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConnection() => new MySqlConnection(_connectionString);

        public IEnumerable<T> Select<T>() where T : new()
        {
            var output = new List<T>();
            var properties = typeof(T).GetProperties();
            var tableName = GetTableName<T>();
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
                        {
                            int index = reader.GetOrdinal(ToCamelCase(property.Name));
                            
                            property.SetValue(newT, reader.IsDBNull(index) ? null : reader[index]);
                        }
                            
                        
                        output.Add(newT);
                    }
                }
            }

            return output;
        }
        public void Delete<T>(string conditionField, int conditionValue)
        {
            string tableName = GetTableName<T>();

            using (var connection = GetConnection())
            {
                var command = new MySqlCommand($"delete from {tableName} where {ToCamelCase(conditionField)} = {conditionValue}", connection);
                
                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public int Insert<T>(T value)
        {
            int insertId = 0;
            var command = CreateInsertCommand<T>(value);

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();

                insertId = LastInsertedId(connection);
            }

            return insertId;
        }

        public void Update<T>(T value)
        {
            var command = CreateUpdateCommand<T>(value);

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void Update<T>(T value, string field)
        {
            string tableName = GetTableName<T>();
            var primaryKeyProperty = typeof(T).GetProperties()
                .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));
            var newValueProperty = typeof(T).GetProperties()
                .First(p => p.Name.Equals(field, StringComparison.OrdinalIgnoreCase));
            var command = new MySqlCommand($"update {tableName} set {ToCamelCase(field)} = @newValue where {ToCamelCase(primaryKeyProperty.Name)} = @primaryKeyValue");

            command.Parameters.AddWithValue("@newValue", newValueProperty.GetValue(value));
            command.Parameters.AddWithValue("@primaryKeyValue", primaryKeyProperty.GetValue(value));

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        
        private string ToCamelCase(string value) => char.ToLowerInvariant(value[0]) + value.Substring(1);

        private MySqlCommand CreateInsertCommand<T>(T value)
        {
            var command = new MySqlCommand();
            string fieldNames = string.Empty;
            string fieldValues = string.Empty;
            

            var properties = typeof(T).GetProperties().Where(x => !Attribute.IsDefined(x, typeof(PrimaryKeyAttribute))).Select(x => x);

            foreach(var property in properties)
            {
                fieldNames += string.Format(INSERT_STRING_FORMATTING, ToCamelCase(property.Name));
                fieldValues += $"@{property.Name},";
                
                command.Parameters.AddWithValue($"@{property.Name}", property.GetValue(value));
            }

            fieldNames = $"{fieldNames.TrimEnd(',')}";
            fieldValues = $"{fieldValues.TrimEnd(',')}";

            command.CommandText = $"insert into {GetTableName<T>()} ({fieldNames}) values({fieldValues})";
            
            return command;
        }
        
        private MySqlCommand CreateUpdateCommand<T>(T value)
        {
            var command = new MySqlCommand();
            string fieldUpdates = string.Empty;

            var properties = typeof(T).GetProperties().Where(x => !Attribute.IsDefined(x, typeof(PrimaryKeyAttribute))).Select(x => x);

            foreach(var property in properties)
            {
                fieldUpdates += String.Format(UPDATE_STRING_FORMATTING, ToCamelCase(property.Name), property.Name);
                command.Parameters.AddWithValue($"@{property.Name}", property.GetValue(value));
            }

            fieldUpdates = fieldUpdates.TrimEnd(',');
            
            //Get the primary key to update against
            var primaryKeyProperty = typeof(T).GetProperties()
                .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));

            command.Parameters.AddWithValue($"@{primaryKeyProperty.Name}", primaryKeyProperty.GetValue(value));
            
            command.CommandText = $"update {GetTableName<T>()} set {fieldUpdates} where {ToCamelCase(primaryKeyProperty.Name)}=@{primaryKeyProperty.Name}";
            
            return command;
        }
        
        private string GetTableName<T>() => GetTableName(typeof(T));
        private string GetTableName(Type tableType) =>
            ((TableAttribute)tableType.GetCustomAttributes(typeof(TableAttribute), inherit: false).Single()).Name;

        private int LastInsertedId(MySqlConnection connection)
        {
            var command = new MySqlCommand("select last_insert_id()", connection);
            return Convert.ToInt32(command.ExecuteScalar());
        }
    }
}