using System;
namespace Chef.Domain.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public IList<Food> Foods = new List<Food>();

        public Category()
        {
        }

        public Category(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }

}
