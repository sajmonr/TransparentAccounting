namespace TransparentAccounting.Models
{
    public enum UserUpdateResult
    {
        Ok, PasswordUsedInPast, UsernameTaken, UserNotFound, WrongSecurityAnswer
    }
}