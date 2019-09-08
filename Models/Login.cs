namespace TransparentAccounting.Models
{
    public class Login
    {
        public User User { get; set; }
        public LoginResult Result { get; set; }
    }
    
    public enum LoginResult{Success, InvalidPassword, UserSuspended, NotFound, LockedOut, PasswordExpired}
    
}