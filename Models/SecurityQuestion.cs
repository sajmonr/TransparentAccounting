using Entities = TransparentAccounting.Sql.Entities;

namespace TransparentAccounting.Models
{
    public class SecurityQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

        public static SecurityQuestion FromDbEntity(Entities.SecurityQuestion question)
        {
            return new SecurityQuestion
            {
                Id = question.Id,
                Question = question.Question
            };
        }
        
    }
}