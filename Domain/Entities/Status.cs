using System;
namespace Chef.Domain.Entities
{
	public class Status
	{
        public byte Id { get; set; }
        public string Name { get; set; }

        public Status() { }

        public Status(byte id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}

