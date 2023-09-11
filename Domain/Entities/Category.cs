using System;
namespace Chef.Domain.Entities
{
    public class Category
    {
        public byte Id { get; set; }
        public string Name { get; set; }

        public Category() { }

        public Category(byte id, string name) {
            Id = id;
            Name = name;
        }

    }

}
