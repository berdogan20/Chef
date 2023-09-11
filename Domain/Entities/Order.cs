using System;
namespace Chef.Domain.Entities
{
	public class Order
	{
        public string OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderOwner { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }

        public IList<OrderItem> OrderItems = new List<OrderItem>();

        public Order()
        {

        }

        public Order(
            string orderId,
            DateTime orderDate,
            string orderOwner,
            string address,
            string status)
        {
            OrderId = orderId;
            OrderDate = orderDate;
            OrderOwner = orderOwner;
            Address = address;
            Status = status;
        }

    }
}

