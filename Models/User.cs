using System.Net;
using System.Security.Permissions;

namespace TransparentAccounting.Models
{
    public enum UserRole{ Administrator, Manager, User }
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public UserRole Role { get; set; }
        public List<Asset> assets;
        public List<Equity> equities;
        public List<Liability> liabilities;
    }
}