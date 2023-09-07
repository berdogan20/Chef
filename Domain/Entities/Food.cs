using System;
namespace Chef.Domain.Entities
{

	// Since the foos's price can change,
	// I will declare it as a class, not record
	public class Food
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public byte PreperationTime { get; set; }
        public int Price { get; set; }

        public Food() { }

        public Food(
            Guid id,
            string name,
            string description,
            string imageUrl,
            byte preperationTime,
            int price)
        {
            Id = id;
            Name = name;
            Description = description;
            ImageUrl = imageUrl;
            PreperationTime = preperationTime;
            Price = price;
        }


    }
}

