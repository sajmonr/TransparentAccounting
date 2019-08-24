using TransparentAccounting.Sql.Attributes;

namespace TransparentAccounting.Sql.Entities
{ 
    [Table("assets")]
    public class Assets
    {

        public string Name { get; set; }
        public void AddToAssets(List<Assets> assets)
        {
            assets.add(this);
        }


    }


    
}