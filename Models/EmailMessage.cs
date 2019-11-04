namespace TransparentAccounting.Models
{
    public class EmailMessage
    {
        public string Message { get; set; }
        public string Subject { get; set; }
        public string[] Recipients { get; set; }
        public string[] Attachments { get; set; }
        public bool IsHtml { get; set; }
    }
}