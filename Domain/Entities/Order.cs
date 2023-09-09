using System;
namespace Chef.Domain.Entities
{
	public class Order
	{
        public string OrderId { get; set; }
        public Guid FoodId { get; set; }
        public string OrderOwner { get; set; }
        public byte Amount { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }

        public Order()
        {

        }

        public Order(
            string orderId,
            Guid foodId,
            string orderOwner,
            byte amount,
            string address,
            string status)
        {
            OrderId = orderId;
            FoodId = foodId;
            OrderOwner = orderOwner;
            Amount = amount;
            Address = address;
            Status = status;
        }

    }
}

