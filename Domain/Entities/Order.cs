using System;
namespace Chef.Domain.Entities
{
	public class Order
	{
        public Guid Id { get; set; }
        public string OrderOwner { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }

        public Order()
        {

        }

        public Order(
            Guid id,
            string orderOwner,
            string address,
            string status)
        {
            Id = id;
            OrderOwner = orderOwner;
            Address = address;
            Status = status;
        }

    }
}

