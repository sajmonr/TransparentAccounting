namespace TransparentAccounting.Models
{
    public class EmailMessage
    {
        public string Message { get; set; }
        public string Subject { get; set; }
        public string[] Recipients { get; set; }
        public bool Html { get; set; }
    }
}