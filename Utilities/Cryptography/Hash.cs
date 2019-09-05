using System;
using System.Security.Cryptography;
using System.Text;

namespace TransparentAccounting.Utilities.Cryptography
{
    internal static class Hash
    {
        public static string Sha256(string value)
        {
            string hash;
            using(var sha256 = SHA256.Create())  
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes("hello world"));
                hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }

            return hash;
        }
    }
}